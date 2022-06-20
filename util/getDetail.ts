import { load } from "cheerio";
import { MovieItem } from "../types";
import { detailBaseUrl, request, userAgents } from "./constants";

// export const getDetail = async (item: MovieItem) => {
//   const link = item.link;
//   // const nightmare = new Nightmare({ show: false });
//   // return new Promise(async (resolve) => {
//   //   const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
//   //   const page = await browser.newPage();
//   //   await page.goto(baseUrl + link);
//   //   const html = await page.evaluate(() => {
//   //     return document.body.innerHTML;
//   //   });
//   //   console.log(html);
//   //   // const $ = load(html, { decodeEntities: true });
//   //   // const img = $("#Zoom>img").attr("src");
//   //   // console.log(img);
//   //   // resolve({
//   //   //   ...item,
//   //   //   img,
//   //   // })
//   // });
//   // return new Promise<any>((resolve) => {
//   //   nightmare
//   //     .goto(baseUrl + link)
//   //     .wait(500)
//   //     .evaluate(() => {
//   //       return document.body.innerHTML;
//   //     })
//   //     .then((html) => {
//   //       const $ = load(html, { decodeEntities: false });
//   //       const img = $("#Zoom>img").attr("src");
//   //       console.log(img);
//   //       resolve({
//   //         ...item,
//   //         img,
//   //       });
//   //     });
//   // });
//   return new Promise<MovieItem>((resolve) => {
//     request
//       .get(baseUrl + link)
//       .buffer(true)
//       .charset("gbk")
//       .end((err, html) => {
//         if (err) {
//           console.log(err);
//           getDetail(item);
//           return;
//         }
//         const $ = load(html.text, { decodeEntities: false });
//         const img = $("#Zoom>img").attr("src");
//         console.log(img);
//         const aList = $("#downlist > table > tbody > tr > td > a");
//         // console.log(aList);
//         let torrents: any = [];
//         if (aList.length > 1) {
//           torrents = aList.map((i, a) => {
//             const url = $(a).attr("href");
//             // console.log(url, "url");
//           });
//         } else {
//           // console.log(
//           //   $("#downlist > table > tbody > tr > td > a").attr("href"),
//           //   "url"
//           // );
//           torrents = [
//             $("#downlist > table > tbody > tr > td > a").attr("href"),
//           ];
//         }
//         // console.log(torrents);
//         resolve({
//           ...item,
//           img,
//           torrents,
//         });
//       });
//   });
// };

export const getDetail = (link: string) => {
  return new Promise<Record<string, any>>((resolve) => {
    request
      .get(detailBaseUrl + link)
      .buffer(true)
      .charset("gbk")
      .end((err, html) => {
        if (err) {
          console.log(err);
          getDetail(link);
          return;
        }
        const $ = load(html.text, { decodeEntities: false });
        const img = $("#Zoom>span>img").attr("src");
        const title = $(
          "#header > div > div.bd2 > div.bd3 > div.bd3l > div.co_area2 > div.title_all > h1 > font"
        ).text();
        const downloadLink = $("#Zoom > span > a").attr("href");
        const name = $("#Zoom > span > a > strong > font > font > font").text();
        // const;
        console.log({
          img,
          title,
          torrents: [
            {
              name,
              link: downloadLink,
            },
          ],
        });
        resolve({
          img,
          title,
          torrents: [
            {
              name,
              link: downloadLink,
            },
          ],
        });
      });
  });
};
