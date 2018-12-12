import request from '../utils/request'
// 案件相关

// 获取案件
export const caseList = data => request.get(`/getCaseList`, data)

// 获取字典
// CASE_SOURCE	案件来源
// CASE_TYPE	案件类型
// VEHICLE_COLOR	车辆颜色
// VEHICLE_TYPE	车型
// CASE_RELATION	涉案关系
// JOIN_ROLE	参与角色
// PERSONNEL_TYPE	人员类型
// PARTY_TYPE	当事人类别
// OTHER_TYPE	其他信息类别
// RES_TYPE	物品分类
// EVIDENCE_TYPE	证据类型
// TRANSPORT_WAY	运输方式
// TRANSPORT_CASE_ADDRESS	运输案件案发地
// PLACE_TYPE	地点类型
// LICENSE	许可证业态
// SCALE	规模
// MARKET_TYPE	市场类型
// SEND_PATH	寄递渠道
// CASE_ORIGIN	案由
export const getDict = data => request.get(`/getDict?dictLb=${data}`, data)
// export const getDict = data => request.get(`/getDict?${data}`, data)

export const submitCase = data => request.post(`/submitCase?cmd=add&id=${data.id}`, data)
