import React from 'react'
import Book from '../../components/Book'
import PageHeader from '../../components/PageHeader'
import styles from './index.module.less'
import TypeSelect from '../../components/TypeSelect'



export default function index() {
  return (
    <div className={styles.container}>
      <PageHeader
        title='最新资源'
        children={<TypeSelect />}
      />
      <Book />
    </div>
  )
}
