import Vue from 'vue'
// svg component
import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon', SvgIcon)

/**
 * 在实际的开发工程中，有时候我们需要一次性的引入某个文件夹下的所有文件
 *      require.context(directory, useSubdirectories, regExp)：
 *          directory：需要引入的文件目录
 *          useSubdirectories：是否查找该目录下的子级目录
 *          regExp：匹配引入文件的正则表达式
 */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

