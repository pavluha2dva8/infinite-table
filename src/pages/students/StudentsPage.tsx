import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react'

import {
  Box,
  Divider,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  useTheme,
} from '@mui/material'
import { Blocks } from 'react-loader-spinner'

import { useAppDispatch, useAppSelector } from '../../store/hooks'

import { loadStudents, filterStudents } from './StudentsSlice'
import { Mark } from './types'

export const StudentsPage: FC = () => {
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('')
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Mark[] | null>(null)
  const intersection = useRef(null)

  const { spacing } = useTheme()
  const dispatch = useAppDispatch()

  const { students, loading } = useAppSelector((state) => state.students)

  const handleModalOpen = (marks: Mark[]) => setSelectedStudent(marks)

  const handleModalClose = () => setSelectedStudent(null)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setQuery(query)

    if (query.length > 2) {
      setPage(1)
      dispatch(filterStudents({ query, page: 1 }))
    } else if (!query.length) {
      setPage(1)
      dispatch(filterStudents({ query: '', page: 1 }))
    }
  }

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    setIsIntersecting(target.isIntersecting)
    if (target.isIntersecting) {
      setPage((prev) => prev + 1)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    })
    if (intersection.current) {
      observer.observe(intersection.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [handleObserver])

  useEffect(() => {
    if (isIntersecting) {
      dispatch(loadStudents({ query, page }))
    }
  }, [isIntersecting])

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <TextField placeholder={'Filter'} value={query} onChange={handleSearch} />

        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Lectures Attended</TableCell>
              <TableCell>Total Lectures</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow
                key={index}
                onClick={() => handleModalOpen(student.marks)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <TableCell>
                  <img alt="Student" src={student.avatarURL} />
                </TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.lecturesAttended}</TableCell>
                <TableCell>{student.totalLectures}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Divider ref={intersection} sx={{ mb: spacing(2) }} />

        <Blocks visible={loading} height="80" width="80" ariaLabel="blocks-loading" />
      </Box>

      {selectedStudent && (
        <Modal
          open={!!selectedStudent}
          onClose={handleModalClose}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box bgcolor="#ffffff" p={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject Title</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Obtained</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedStudent.map((mark, index) => (
                  <TableRow key={index}>
                    <TableCell>{mark.subjectTitle}</TableCell>
                    <TableCell>{mark.totalMarks}</TableCell>
                    <TableCell>{mark.marksObtained}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Modal>
      )}
    </>
  )
}
