const modalConfig = {
  pageName: 'users',
  header: {
    title: '编辑用户'
  },
  formItems: [
    {
      type: 'input',
      label: '用户名',
      prop: 'name',
      placeholder: '请输入查询的用户名'
    },
    {
      type: 'input',
      label: '真实姓名',
      prop: 'realname',
      placeholder: '请输入查询的用户名'
    },
    {
      type: 'input',
      label: '密码',
      prop: 'password',
      placeholder: '请输入您的密码'
    },
    {
      type: 'input',
      label: '手机号码',
      prop: 'cellphone',
      placeholder: '请输入查询的手机号码'
    },
    {
      type: 'select',
      label: '选择角色',
      prop: 'roleId',
      placeholder: '请选择角色',
      slotName: 'roleSlot'
    },
    {
      type: 'select',
      label: '选择部门',
      prop: 'departmentId',
      placeholder: '请选择部门',
      slotName: 'departmentSlot'
    }
  ]
}

export default modalConfig
