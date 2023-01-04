const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  tableItems: [
    { label: '菜单名称', prop: 'name', width: '150' },
    { label: '级别', prop: 'type', width: '120' },
    { label: '菜单url', prop: 'url', width: '150' },
    { label: '菜单icon', prop: 'icon', width: '200' },
    { label: '排序', prop: 'sort', width: '120' },
    { label: '权限', prop: 'permission', width: '150' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150' }
  ]
}

export default contentConfig
