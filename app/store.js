import _getDocsMap from "@/utils/getDocsMap";
import { getAllToc as _getAllToc, getToc as _getToc } from "@/utils/getToc";

class Store {
  docsMap = null;

  toc = null;

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
      const toc = await _getAllToc();
      this.toc = toc;
      return toc;
    }
    return this.toc;
  }

  // 获取某个文章的目录
  async getToc(filePath, title) {
    if (!this.toc) {
      await this.getAllToc();
      return await _getToc(filePath);
    }
    return this.toc[title];
  }
}

export default new Store();
