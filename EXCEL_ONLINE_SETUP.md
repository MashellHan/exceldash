# Excel Online 插件部署指南

## 📋 概述

当前的插件支持在 **Excel Online** 中运行，但需要使用不同的部署方式：

- ✅ **桌面版 Excel**: 使用 `embed_addin.py` 嵌入到 `.xlsx` 文件
- ✅ **Excel Online**: 使用 Sideloading（旁加载）方式

## 🌐 Excel Online 部署方法

### 方法 1：开发者模式 Sideloading（推荐）

1. **上传 manifest 文件**：
   ```bash
   # 使用 manifest_online.xml 文件
   # 确保你的 Web 服务器运行在 HTTPS 上
   ```

2. **在 Excel Online 中加载插件**：
   - 打开 [Excel Online](https://office.com)
   - 创建新的工作簿或打开现有工作簿
   - 点击 **插入** → **Office 加载项** → **上传我的加载项**
   - 选择 `manifest_online.xml` 文件上传

3. **确保 Web 服务可访问**：
   ```bash
   # 确保以下 URL 可以正常访问：
   # https://8080-ibcq34tzqozbvcxg5c7o0-b334fc63.e2b.dev/focus-management.html
   ```

### 方法 2：通过 Microsoft 365 管理中心部署（企业用户）

1. **管理员操作**：
   - 登录 [Microsoft 365 管理中心](https://admin.microsoft.com)
   - 转到 **设置** → **集成应用** → **Office 加载项**
   - 上传 `manifest_online.xml` 文件
   - 配置部署范围（组织内用户）

2. **用户使用**：
   - 插件将自动出现在所有用户的 Excel Online 中
   - 在 **插入** → **我的加载项** 中找到

## 🔧 两个版本的差异

| 特性 | 桌面版嵌入 | Excel Online |
|------|------------|--------------|
| 部署方式 | 嵌入 .xlsx 文件 | Sideloading/管理中心 |
| 分发方式 | 文件分享 | 用户手动安装/管理员部署 |
| 更新方式 | 重新生成文件 | 更新 manifest 文件 |
| 权限控制 | 文件级别 | 用户/组织级别 |

## 📝 注意事项

### Excel Online 限制：
1. **HTTPS 要求**：所有资源必须通过 HTTPS 提供
2. **跨域限制**：需要正确配置 CORS 头
3. **文件访问**：某些文件操作可能受限
4. **网络依赖**：需要稳定的网络连接

### 推荐的 Web 服务器配置：
```nginx
# CORS 配置示例
add_header 'Access-Control-Allow-Origin' 'https://office.com' always;
add_header 'Access-Control-Allow-Origin' 'https://excel.office.com' always;
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;
```

## 🚀 快速测试步骤

1. **启动你的 Web 服务器**（确保 HTTPS）
2. **测试 URL 可访问性**：
   ```bash
   curl -I "https://8080-ibcq34tzqozbvcxg5c7o0-b334fc63.e2b.dev/focus-management.html"
   ```
3. **在 Excel Online 中上传** `manifest_online.xml`
4. **验证插件加载**并测试功能

## ⚡ 故障排除

### 常见问题：
1. **插件不显示**：检查 manifest XML 格式和 URL 可访问性
2. **CORS 错误**：配置正确的跨域头
3. **HTTPS 错误**：确保证书有效
4. **功能限制**：某些 API 在 Excel Online 中可能受限

### 调试工具：
- 浏览器开发者工具（F12）
- Office 加载项调试器
- 网络请求监控

## 📚 相关资源

- [Office 加载项文档](https://docs.microsoft.com/office/dev/add-ins/)
- [Excel Online API 参考](https://docs.microsoft.com/office/dev/add-ins/reference/overview/excel-add-ins-reference-overview)
- [旁加载指南](https://docs.microsoft.com/office/dev/add-ins/testing/sideload-office-add-ins-for-testing) 