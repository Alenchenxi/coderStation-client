import React from 'react'
import { Card } from 'antd'

/**
 * 简单封装antd的Card组件
 */
export default function CardAntd({children,...props}) {
  return (
      <Card {...props}>
          {children}
    </Card>
  )
}
