export interface Mark {
  subjectTitle: string
  totalMarks: number
  marksObtained: number
}

export interface Student {
  name: string
  avatarURL: string
  lecturesAttended: number
  totalLectures: number
  marks: Mark[]
}

export interface StudentsRequestPayload {
  query: string
  page: number
}

export interface StudentsState {
  students: Student[]
  loading: boolean
  error: string | undefined
}
