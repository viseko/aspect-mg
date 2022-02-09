// Основной модуль
import gulp from "gulp";
// Импорт путей
import {path} from "./gulp/config/path.js";
// Импорт общих плагинов
import {plugins} from "./gulp/config/plugins.js";
// Импорт API-ключей

// Передаём значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Импорт задач
import {copy} from "./gulp/tasks/copy.js";
import {reset} from "./gulp/tasks/reset.js";
import {html} from "./gulp/tasks/html.js";
import {scss} from "./gulp/tasks/scss.js";
import {js} from "./gulp/tasks/js.js";
import {images} from "./gulp/tasks/images.js";
import {svgsprite} from "./gulp/tasks/svgsprite.js";
import {favicon} from "./gulp/tasks/favicon.js";
import {server} from "./gulp/tasks/server.js";
import {otfToTtf, ttfToWoff, fontStyle} from "./gulp/tasks/fonts.js";
import {zip} from "./gulp/tasks/zip.js";
import {ftp} from "./gulp/tasks/ftp.js";

// Отслеживание изменений в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

// Основные задачи
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images, svgsprite, favicon)
);

// Сценарии выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Задача по умолчанию
gulp.task("default", dev);

// Экспорт тасков
export {svgsprite, dev, build, deployZip, deployFTP};
