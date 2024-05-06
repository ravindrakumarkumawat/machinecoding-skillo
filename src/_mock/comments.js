const comments = [
  {
    comment_id: 1,
    comment: 'thankyou',
    reply: [],
    user_id: 2,
    user_name: 'Clueless_kun',
    comment_time: '2024-12-04',
    nesting_levels_id: "1"
  },
  {
    comment_id: 2,
    comment: 'thankyou',
    reply: [
      {
      comment_id: 35,
      comment: 'not',
      reply: [
        {
          comment_id: 3,
      comment: 'not',
      reply: [],
      user_id: 3,
      user_name: 'Jhon doe',
      comment_time: '2024-12-04',
      nesting_levels_id: "2.35.3.",
        }
      ],
      user_id: 3,
      user_name: 'Jhon doe',
      comment_time: '2024-12-04',
      nesting_levels_id: "2.35"
    }
  ],
    user_id: 1,
    user_name: 'Jane Doe',
    comment_time: '2024-12-04',
    nesting_levels_id: '2'
  },
  {
    comment_id: 3,
    comment: 'thankyou',
    reply: [],
    user_id: 3,
    user_name: 'Jhon doe',
    comment_time: '2024-12-04',
    nesting_levels_id: '3'
  }
]

export default comments