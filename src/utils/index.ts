import { cloneDeep } from 'lodash'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
// const { pathToRegexp } = require("path-to-regexp")
// import moment from 'moment'
// import 'moment/locale/zh-cn'
// @ts-ignore
import store from '@/store'
// @ts-ignore
import config from './config.ts'
const i18n =  config.i18n
// @ts-ignore
import theme from './theme.ts'
export const Color = theme.Color
// @ts-ignore
export const languages = i18n ? i18n.languages.map((item) => item.key) : []
export const defaultLanguage = i18n ? i18n.defaultLanguage : ''

/**
 * Query objects that specify keys and values in an array where all values are objects.
 * @param   {array}         array   An array where all values are objects, like [{key:1},{key:2}].
 * @param   {string}        key     The key of the object that needs to be queried.
 * @param   {string}        value   The value of the object that needs to be queried.
 * @return  {object|undefined}   Return frist object when query success.
 */
export const queryArray = ({ array, key, value }: { array: any; key: any; value: any }) => {
  if (!Array.isArray(array)) {
    return
  }
  return array.find((_) => _[key] === value)
}

/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    parentId       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(array: any[], id = 'id', parentId = 'pid', children = 'children') {
  const result: any[] = []
  const hash = {}
  const data = cloneDeep(array)

  data.forEach((item, index) => {
    // @ts-ignore
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    // @ts-ignore
    const hashParent = hash[item[parentId]]
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = [])
      hashParent[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * In an array object, traverse all parent IDs based on the value of an object.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the value of the object that needs to be queried.
 * @param   {string}    parentId  The alias of the parent ID of the object in the array.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
export const queryPathKeys = ({ array, current, parentId, id = 'id' }: { array: any; current: any; parentId: any; id?: string }) => {
  const result = [current]
  const hashMap = new Map()
  // @ts-ignore
  array.forEach((item) => hashMap.set(item[id], item))

  const getPath = ({ current }: { current: any }) => {
    const currentParentId = hashMap.get(current)[parentId]
    if (currentParentId) {
      result.push(currentParentId)
      getPath({ current: currentParentId })
    }
  }

  getPath({ current: current })
  return result
}

/**
 * In an array of objects, specify an object that traverses the objects whose parent ID matches.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the object that needs to be queried.
 * @param   {string}    parentId  The alias of the parent ID of the object in the array.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
export function queryAncestors({ array, current, parentId, id = 'id' }: { array: any; current: any; parentId: any; id?: string }) {
  const result = [current]
  const hashMap = new Map()
  array.forEach(({ item }: { item: any }) => hashMap.set(item[id], item))

  const getPath = ({ current }: { current: any }) => {
    const currentParentId = hashMap.get(current[id])[parentId]
    if (currentParentId) {
      result.push(hashMap.get(currentParentId))
      getPath(hashMap.get(currentParentId))
    }
  }

  getPath(current)
  return result
}

/**
 * Query which layout should be used for the current path based on the configuration.
 * @param   {layouts}     layouts   Layout configuration.
 * @param   {pathname}    pathname  Path name to be queried.
 * @return  {string}   Return frist object when query success.
 */
// export function queryLayout({layouts, pathname}: { layouts: any, pathname: any }) {
//   let result = 'public'
//
//   const isMatch = ({regepx}:{regepx:any}) => {
//     return regepx instanceof RegExp
//       ? regepx.test(pathname)
//       : pathToRegexp(regepx).exec(pathname)
//   }
//
//   for (const item of layouts) {
//     let include = false
//     let exclude = false
//     if (item.include) {
//       for (const regepx of item.include) {
//         if (isMatch(regepx)) {
//           include = true
//           break
//         }
//       }
//     }
//
//     if (include && item.exclude) {
//       for (const regepx of item.exclude) {
//         if (isMatch(regepx)) {
//           exclude = true
//           break
//         }
//       }
//     }
//
//     if (include && !exclude) {
//       result = item.name
//       break
//     }
//   }
//
//   return result
// }

export function getLocale() {
  return store.get('locale') || defaultLanguage
}

export function setLocale({ language }: { language: any }) {
  if (getLocale() !== language) {
    // moment.locale(language === 'zh' ? 'zh-cn' : language)
    store.set('locale', language)
    window.location.reload()
  }
}

export function downLoadPdf(content, fileName) {
  content = content ? content : null
  // 条件判断是否打印
  if (!content) {
    alert('打印失败，请重新操作')
    return false
  }
  // 开始打印
  console.log(content)
  let contentWidth = content.style.width
  let contentHeight = content.style.width
  let canvas = document.createElement('canvas')
  canvas.width = contentWidth
  canvas.height = contentHeight
  let context = canvas.getContext('2d')
  html2canvas(content, {
    allowTaint: true,
    scale: 2, // 提升画面质量，但是会增加文件大小
  }).then(function (canvas) {
    let pdfWidth = canvas.width
    let pdfHeight = canvas.height
    let pageHeight = (pdfWidth / 592.28) * 841.89
    let leftHeight = pdfHeight
    let position = 0
    let imgWidth = 595.28
    let imgHeight = (595.28 / pdfWidth) * pdfHeight
    let pageData = canvas.toDataURL('img/jpeg', 1.0)
    let pdf = new jsPDF('', 'pt', 'a4')
    // 判断打印dom高度是否需要分页，如果需要进行分页处理
    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        if (leftHeight > 0) {
          pdf.addPage()
        }
      }
    }
    pdf.save(fileName + '.pdf')
  })
}
