import { html, load } from "cheerio";
import { MovieItem } from "../types";
import { baseUrl, request, userAgents } from "./constants";
import { getDetail } from "./getDetail";
import sleep from "system-sleep";
const [
  newList,
  hotList,
  thunderList,
  classicalList,
  chineseTvList,
  //   日韩电影
  JKTvList,
  //   欧美电影列表
  EATvList,
  //   综艺动漫
  VarietyList,
] = [[], [], [], [], [], [], [], []];
const totalList: MovieItem[][] = [
  newList,
  hotList,
  thunderList,
  classicalList,
  chineseTvList,
  JKTvList,
  EATvList,
  VarietyList,
];
export const initData = async () => {
  // const browser = await puppeteer.launch({
  //   slowMo: 1000,
  //   headless: false,
  // });
  // const page = await browser.newPage();
  // await page.setViewport({ width: 1200, height: 1000 });
  // await page.setDefaultNavigationTimeout(0);
  // await page.goto(baseUrl);

  // const html = await page.evaluate(() => {
  //   return document.body.innerHTML;
  // });
  request
    .get(baseUrl)
    .buffer(true)
    .set({
      "User-Agent": userAgents[Math.floor(Math.random() * userAgents.length)],
    })
    .charset("gbk")
    .end(async (err, html) => {
      if (err) {
        return;
      }
      const $ = load(html.text, { decodeEntities: false });
      try {
        const list = $(".co_content2");
        const tempList = [];
        for (let i = 0; i < list.length; i++) {
          const element = list[i];
          const aList = $(element).find("ul>a");
          aList.each((i, a) => {
            let o = {
              link: "",
              title: "",
            };
            const text = $(a).text();
            o.link = $(a).attr("href");
            o.title = $(a).text();
            if (newList) {
              tempList.push(o);
            }
          });
        }
        if (tempList.length) {
          for (let i = 0; i < 10; i++) {
            const item = tempList[i];
            newList[i] = await getDetail(item.link);
          }
        }
        console.log(newList);
        return totalList;
      } catch (err) {
        console.log(err);
        initData();
      }
    });

  // const nightmare = Nightmare({ show: true });
  // return new Promise<Array<MovieItem[]>>((resolve) => {
  //   nightmare
  //     .wait(3000)
  //     .goto(baseUrl)
  //     .wait(".co_content222")
  //     .evaluate(() => {
  //       const html = document.body.innerHTML;
  //       const $ = load(html, { decodeEntities: false });
  //       try {
  //         $(".co_content222").each((index, element) => {
  //           const list = totalList[index];
  //           const liList = $(element).find("ul>li");
  //           liList.each((i, li) => {
  //             const o = {
  //               link: "",
  //               title: "",
  //             };
  //             const text = $(li).text();
  //             o.title = text;
  //             if (list) {
  //               list.push(o);
  //             }
  //           });
  //           //   console.log(list);
  //           const aList = $(element).find("ul>li>a");
  //           aList.each((aIndex, a) => {
  //             const href = $(a).attr("href");
  //             if (list && list[aIndex]) {
  //               list[aIndex].link = href;
  //             }
  //           });
  //         });
  //         return totalList;
  //       } catch (err) {
  //         console.log(err);
  //         initData();
  //       }
  //     })
  //     .then((list) => {
  //       resolve(list);
  //     });
  // });
};
// 获取最新电影列表
export const getNewList = async () => {
  return newList;
};

// 获取热门电影列表
export const getHotList = async () => {
  return hotList;
};
