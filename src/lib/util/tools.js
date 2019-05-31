/**
 *@Author: Goxcheer
 *@Date:15:43 2019/5/28
 *@Email:604721660@qq.com
 *@decription: js工具类(公共逻辑)
 */
/**
 * 数据中是否含有某一元素
 * @param access
 * @param Arr
 * @returns {*}
 */
export const hasOneOf = (access, Arr) => {
  return Arr.find(item => access === item)
}
