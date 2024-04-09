"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    promptTypeList: [
        {
            type: "list",
            message: "请选择拉取的模版类型:",
            name: "type",
            choices: [
                {
                    name: "Vue3-H5",
                    value: {
                        url: "https://github.com/undercurre/PolyWeb.git",
                        gitName: "PolyWeb",
                        branch: "main",
                        val: "H5模板",
                    },
                },
                {
                    name: "Vue3-PC",
                    value: {
                        url: "https://github.com/undercurre/PolyWeb.git",
                        gitName: "PolyWeb",
                        branch: "electron",
                        val: "桌面应用模板",
                    },
                },
                {
                    name: "Vue3-Hybrid",
                    value: {
                        url: "https://github.com/undercurre/PolyWeb.git",
                        gitName: "PolyWeb",
                        branch: "uni(app/mini)",
                        val: "混合H5/APP/PC桌面应用/小程序开发模板",
                    },
                },
            ],
        },
    ],
};
