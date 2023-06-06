import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import Issue from '../pages/Issue'
import Books from '../pages/Books'
import Interview from '../pages/Interview'
import AddIssue from '../pages/AddIssue'
import IssueDetail from '../pages/IssueDetail'
import SearchPage from '../pages/SearchPage'
import BookDetail from '../pages/BookDetail'
import Personal from '../pages/Personal'

export default function RouteConfig() {
    return useRoutes([
        { path: '/issues', element: <Issue /> },
        { path: '/issues/:id', element: <IssueDetail /> },
        { path: '/addIssue', element: <AddIssue /> },
        { path: '/books', element: <Books /> },
        { path: '/books/:id', element: <BookDetail /> },
        { path: '/searchPage', element: <SearchPage /> },
        { path: '/personal', element: <Personal /> },
        { path: '/interview', element: <Interview /> },
        { path: '/', element: <Navigate to='/issues' replace /> },
    ])
}
