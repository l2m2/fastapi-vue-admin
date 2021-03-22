import os
import glob
import re
import json
import argparse
import psycopg2
import psycopg2.extras
from app.core.config import settings

SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))
PERMISSION_CONF_DIR = os.path.join(SCRIPT_DIR, "../../frontend/src/permissions")


def _get_all_permissions_code():
  files = [y for x in os.walk(PERMISSION_CONF_DIR) for y in glob.glob(os.path.join(x[0], '*.json'))]
  total = []
  for file in files:
    match = re.search(re.compile(PERMISSION_CONF_DIR + "/(.*?).json"), file)
    if match:
      prefix = match.group(1)
      items = []
      with open(file, 'r') as f:
        for item in json.load(f):
          crud_match = re.search(r'^[CRUD]+$', item)
          if crud_match:
            for crud_item in crud_match.group(0):
              if crud_item == "C":
                items.append("create")
              elif crud_item == "R":
                items.append("read")
              elif crud_item == "U":
                items.append("update")
              elif crud_item == "D":
                items.append("delete")
      items = [f"{prefix}/{x}" for x in items]
      total = total + items
  return total


def upload(options):
  codes = _get_all_permissions_code()
  codes = [(x, ) for x in codes]
  if not codes:
    print("no permission conf found.")
    return
  conn = psycopg2.connect(**options)
  cursor = conn.cursor()
  try:
    cursor.execute("DELETE FROM sys_permission")
    print(f"codes: {codes}")
    psycopg2.extras.execute_values(cursor, "INSERT INTO sys_permission(code) VALUES %s", codes)
  except Exception as e:  # noqa: E722
    print(e)
    conn.rollback()
  else:
    conn.commit()
  finally:
    conn.close()


if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument('--host', type=str, required=False)
  parser.add_argument('--port', type=int, required=False)
  parser.add_argument('--user', type=str, required=False)
  parser.add_argument('--password', type=str, required=False)
  parser.add_argument('--database', type=str, required=False)

  options = vars(parser.parse_args())
  # 若命令行参数没有指定，从.env读取
  if not options['host']:
    options['host'] = settings.POSTGRES_SERVER
  if not options['port']:
    options['port'] = settings.POSTGRES_PORT
  if not options['user']:
    options['user'] = settings.POSTGRES_USER
  if not options['password']:
    options['password'] = settings.POSTGRES_PASSWORD
  if not options['database']:
    options['database'] = settings.POSTGRES_DB

  print(f"options: {options}")
  upload(options)
