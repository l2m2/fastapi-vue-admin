# 前端API代码生成器

```shell
python gen.py
```

步骤
1. 获取FastAPI 接口数据：http://127.0.0.1:8000/api/v1/openapi.json
2. 解析JSON按前端要求生成JS文件

## 注意
- 运行此脚本会直接覆盖`frontend/src/api`下的所有文件