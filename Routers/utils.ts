import express from "express";
import { writeFileSync } from "fs";
import Magnet2torrent from "magnet2torrent-js";
import { MovieItem } from "../types";
import { getDetail } from "../util/getDetail";
import { getHotList, getNewList } from "../util/getList";
const router = express.Router();

const trackers = [
  "udp://tracker.internetwarriors.net:1337/announce",
  "udp://tracker.opentrackr.org:1337/announce",
  "udp://tracker.tiny-vps.com:6969/announce",
  "udp://retracker.lanta-net.ru:2710/announce",
  "udp://exodus.desync.com:6969/announce",
  "udp://tracker.moeking.me:6969/announce",
  "udp://exodus.desync.com:6969/announce",
  "udp://tracker.torrent.eu.org:451/announce",
  "udp://ipv4.tracker.harry.lu:80/announce",
];
const magnet =
  "magnet:?xt=urn:btih:4ac9a0cc69265e496ea771af40a33b7e6f3f6435&dn=[%E7%94%B5%E5%BD%B1%E5%A4%A9%E5%A0%82www.dytt89.com]%E8%BE%B9%E7%BC%98%E8%A1%8C%E8%80%85-2022_HD%E7%B2%A4%E8%AF%AD%E4%B8%AD%E5%AD%97.mp4&tr=http://t.t789.me:2710/announce&tr=http://t.t789.co:2710/announce&tr=http://t.t789.vip:2710/announce";

const m2t = new Magnet2torrent({ trackers, timeout: 60 });

router.get("/test", (req, res, next) => {
  m2t
    .getTorrent(magnet)
    .then((torrent: any) => {
      console.log(torrent.infoHash);
      writeFileSync(
        `${__dirname}/../torrent/${torrent.name}.torrent`,
        torrent.toTorrentFile()
      );
      res.send({
        message: "translate finish",
      });
    })
    .catch((e) => {
      // Timeout or error occured
      console.error(e);
    });
});

router.get("/getNewList", async (req, res) => {
  const newList: Array<MovieItem> = await getNewList();
  const trueList = newList.slice(1);
  res.send({
    message: "getNewList success",
    data: trueList,
  })
  // const trueRes = [];
  // for (let i = 0; i < trueList.length; i++) {
  //   const item = trueList[i];
  //   const detail = await getDetail(item);
  //   trueRes.push(detail);
  //   //最后一个
  //   if (i === trueList.length - 1) {
  //     res.send({
  //       message: "getNewList finish",
  //       data: trueRes,
  //     });
  //   }
  // }
});

router.get("/getHotList", async (req, res) => {
  const hotList: Array<Record<string, any>> = await getHotList();
  res.send({
    list: hotList,
  });
});

export default router;
