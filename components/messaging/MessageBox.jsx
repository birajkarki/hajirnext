import React from 'react'
import { Avatar } from '@mui/material'

const MessageBox = ({
  img,
  name,
  timeAgo,
  reason,
  message,
  searchText,
  status,
  onClick,
}) => {
  const highlightText = (text, searchText) => {
    if (!searchText || !text) return text

    const parts = text.split(new RegExp(`(${searchText})`, 'gi'))
    return parts.map((part, index) => (
      <span
        key={index}
        style={
          part.toLowerCase() === searchText.toLowerCase()
            ? { backgroundColor: 'yellow' }
            : {}
        }
      >
        {part}
      </span>
    ))
  }

  return (
    <>
      <div
        style={{ display: 'flex', alignItems: 'center', overflow: 'auto' }}
        onClick={onClick}
      >
        {img && (
          <div>
            <label htmlFor="photo">
              <Avatar
                src={img || '/default-avatar.png'}
                sx={{
                  width: 50,
                  height: 50,
                  cursor: 'pointer',
                  borderRadius: '30%',
                }}
                alt="Profile Avatar"
              />
            </label>
          </div>
        )}
        <div style={{ flex: '1', marginLeft: '10px' }}>
          <p style={{ margin: '0', marginBottom: '2px' }}>
            {highlightText(name, searchText)}
          </p>
          <span style={{ margin: '0', marginBottom: '2px' }}>
            {' '}
            <strong> {highlightText(reason, searchText)} </strong>{' '}
            <span style={{ marginLeft: '70px' }}>
              {' '}
              {highlightText(timeAgo, searchText)}
            </span>
          </span>
          <p style={{ margin: '0', color: 'black' }}>
            {highlightText(status, searchText)}
          </p>
        </div>
      </div>
      <hr
        style={{
          width: '43%',
          margin: '0',
          marginBottom: '30px',
          borderTop: '1px dotted #ddd',
        }}
      />
    </>
  )
}

export default MessageBox
