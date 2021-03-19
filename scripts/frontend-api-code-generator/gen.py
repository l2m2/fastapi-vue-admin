import os
import re
import shutil
import requests

SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))
FRONTEND_API_DIR = "../../frontend/src/api/"

BASE_API = "/api/v1"
OPENAPI_JSON_URL = "http://127.0.0.1:8000/api/v1/openapi.json"

API_FILE_TEMPLATE1 = """/**
 * AUTO-GENERATED BY scripts/frontend-api-code-generator/gen.py
 */
import request from "@/utils/request";

const api = {
  %APIS%
};
export default api;
"""
API_FILE_TEMPLATE2 = """/**
 * AUTO-GENERATED BY scripts/frontend-api-code-generator/gen.py
 */
import qs from "qs";
import request from "@/utils/request";

const api = {
  %APIS%
};
export default api;
"""
INDEX_FILE_TEMPLATE = """/**
 * AUTO-GENERATED BY scripts/frontend-api-code-generator/gen.py
 */

"""


def _get_openapi_json():
  os.environ["NO_PROXY"] = '127.0.0.1'
  r: requests.Response = requests.get(OPENAPI_JSON_URL, timeout=5)
  return r.json()


def _uncapitalize(s):
  return s[:1].lower() + s[1:]


def _get_path_dict(paths):
  """
  Returns
  { "tag": [ { "name": "", "method": "", "url": "", "content_type": "" } ]  }
  """
  path_dict = {}
  for fullpath, methods in paths.items():

    for method, detail in methods.items():

      summary = detail["summary"]
      name = _uncapitalize(re.sub(r'\s+', '', summary))

      tags = detail["tags"]
      if not tags:
        continue
      tag = tags[0]

      content_type: str = ""
      if "requestBody" in detail:
        content_type = next(iter(detail["requestBody"]["content"]))

      tag_obj = {"name": name, "method": method, "url": re.sub(BASE_API, '', fullpath), "content_type": content_type}
      if tag in path_dict:
        path_dict[tag].append(tag_obj)
      else:
        path_dict[tag] = [tag_obj]
  return path_dict


def _get_index_js_content(tags):
  import_lines = []
  content_lines = []
  for tag in tags:
    import_lines.append(f"import {tag} from \"./{tag}.api\";")
    content_lines.append(f"  {tag}")

  index_lines = import_lines
  index_lines.append("")
  index_lines.append("const apis = {")
  index_lines.append(',\n'.join(content_lines))
  index_lines.append("};")
  index_lines.append("export default apis;")
  index_lines.append("")
  return "\n".join(index_lines)


def gen():
  paths = _get_openapi_json()["paths"]
  path_dict = _get_path_dict(paths)
  if not path_dict:
    raise "no path_dict"

  api_dir = os.path.join(SCRIPT_DIR, FRONTEND_API_DIR)
  if os.path.isdir(api_dir):
    shutil.rmtree(api_dir, ignore_errors=True)
  os.makedirs(api_dir)

  # *.api.js
  for tag, apis in path_dict.items():
    api_strs = []
    qs_flag: bool = False
    for api in apis:
      lines = []

      params = re.findall(r'\{(.*?)\}', api["url"])
      if api["method"] == "get":
        params.append("params")
      elif api["method"] in ["post", "put", "patch"]:
        params.append("data")
      params_str: str = ""
      if len(params) > 1:
        params_str = "({})".format(', '.join(params))
      else:
        params_str = "{}".format(', '.join(params))

      lines.append(f"{api['name']}: {params_str} => {{")
      lines.append("    return request({")

      # url
      places = re.findall(r"\{(.*?)\}", api["url"])
      url_value = api["url"]
      for index, place in enumerate(places):
        if (index == (len(places) - 1)) and api["url"][-1] == '}':
          url_value = re.sub(f"{{{place}}}", f'" + {place}', url_value)
        else:
          url_value = re.sub(f"{{{place}}}", f'" + {place} + "', url_value)
      if api["url"][-1] != '}':
        url_value = f"{url_value}\""
      lines.append("      url: \"{},".format(url_value))

      # headers
      if "content_type" in api and api["content_type"]:
        if api["content_type"] == "application/x-www-form-urlencoded":
          qs_flag = True
        lines.append("      headers: {")
        lines.append("        \"Content-Type\": \"{}\"".format(api["content_type"]))
        lines.append("      },")

      # data
      if api["method"] == "get":
        lines.append("      params: params,")
      elif api["method"] in ["post", "put", "patch"]:
        if api["content_type"] == "application/x-www-form-urlencoded":
          lines.append("      data: qs.stringify(data),")
        else:
          lines.append("      data: data,")

      # method
      lines.append("      method: \"{}\"".format(api["method"]))

      lines.append("    });")
      lines.append("  }")

      api_strs.append('\n'.join(lines))

    content = re.sub("%APIS%", ',\n  '.join(api_strs), API_FILE_TEMPLATE1 if not qs_flag else API_FILE_TEMPLATE2)
    with open(os.path.join(api_dir, f"{tag}.api.js"), 'w', encoding='utf-8') as f:
      f.write(content)

  # index.js
  with open(os.path.join(api_dir, "index.js"), 'w', encoding='utf-8') as f:
    f.write(_get_index_js_content(path_dict.keys()))


if __name__ == "__main__":
  print("Start...")
  gen()
  print("Done!")
