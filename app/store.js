import fs from "fs";
import path from "path";

import { markdown2Html } from "./docs/[...title]/md.js";
import _getDocsMap from "@/utils/getDocsMap";
import { getAllToc as _getAllToc, getToc as _getToc } from "@/utils/getToc";

class Store {
  // docs文件夹结构缓存
  docsMap = null;

  // 所有文章目录缓存
  toc = null;

  // Markdown -> html 渲染结果缓存
  renderResult = null;

  constructor() {
    this.renderResult = new Map();
  }

  // 获取所有文章结构
  async getDocsMap() {
    if (!this.docsMap) {
      this.docsMap = await _getDocsMap();
    }
    return this.docsMap;
  }

  // 获取某个文章的相邻文章
  async getNearPage(pathKeys) {
    let isFinal = false;
    let currentDocsMap = await this.getDocsMap();
    for (let index = 0; index < pathKeys.length; index++) {
      const pathKey = pathKeys[index];

      isFinal = index === pathKeys.length - 1;

      for (let item of currentDocsMap) {
        if (item.title === pathKey) {
          currentDocsMap = item.children;
          if (isFinal) {
            const { pre, next } = item;
            return { pre, next };
          }
          break;
        }
      }
    }
  }

  // 获取所有文章的目录
  async getAllToc() {
    if (!this.toc) {
      this.toc = await _getAllToc();
    }
    return this.toc;
  }

  // 获取某个文章的目录
  async getToc(filePath) {
    let key = filePath.split(path.sep);
    key = key
      .slice(key.lastIndexOf("docs") + 1)
      .join(path.sep)
      .replace(".md", "");

    if (!this.toc) {
      return (await this.getAllToc())[key];
    } else {
      return this.toc[key];
    }
  }

  // 获取某个文章的渲染缓存
  async getRenderResult(key, filePath, errorCallback) {
    if (this.renderResult.has(key)) {
      return this.renderResult.get(key);
    } else if (!fs.existsSync(filePath) && errorCallback) {
      errorCallback();
    } else {
      // 获取渲染结果
      const mdHtml = markdown2Html(key, filePath);
      // 缓存
      this.renderResult.set(key, mdHtml);
      return mdHtml;
    }
  }
}

export default new Store();
