import fs from "fs";
import _getDocsMap from "@/utils/getDocsMap";

class Store {
  docsMap = null;

  async getDocsMap() {
    if (!this.docs) {
      this.docsMap = await _getDocsMap();
    }
    return this.docsMap;
  }

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
}

export default new Store();
