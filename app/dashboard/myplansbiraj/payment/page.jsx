'use client'
import React, { useState } from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import {
  useGetAllPackagesQuery,
  useGetPaymentMethodQuery,
  useUpdatePaymentMethodMutation,
} from '@/services/api'
import { Box } from '@mui/system'
import Image from 'next/image'
import DownloadIcon from '@mui/icons-material/Download'

const Payment = () => {
  const router = useRouter()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Esewa')
  const [selectedDuration, setSelectedDuration] = useState('1 month')
  const [priceMultiplier, setPriceMultiplier] = useState(1)
  const [images, setImages] = useState([])
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false)

  const { data: apiResponse, error, isLoading } = useGetAllPackagesQuery()
  const monthlyPlans = apiResponse?.data?.packages || []
  const { data: paymentData } = useGetPaymentMethodQuery()
  const [updatePaymentMethod, { isLoading: isUpdatingPayment }] =
    useUpdatePaymentMethodMutation()
  const searchParams = useSearchParams()
  const search = searchParams.get('title')
  const id = searchParams.get('id')
  const initialPrice = parseFloat(searchParams.get('price')) || 0
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value)
  }
  const totalPrice = (initialPrice * priceMultiplier).toFixed(2)

  const [selectedFile, setSelectedFile] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    console.log('Selected file:', file)
    setSelectedFile(file)
    setIsUploadSuccessful(false)
  }

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value)
    setPriceMultiplier(event.target.value === '6 months' ? 6 : 1)
  }
  const selectedMethod = paymentData?.data?.paymentMethods.find(
    (method) => method.title === selectedPaymentMethod
  )
  const handleDownloadQR = () => {
    const selectedMethod = paymentData?.data?.paymentMethods.find(
      (method) => method.title === selectedPaymentMethod
    )
    if (selectedMethod) {
      const fileName = `${selectedPaymentMethod}_QR_Code.jpeg`
      const imageUrl = selectedMethod.qr_image
      downloadImage(imageUrl, fileName)
    }
  }
  const downloadImage = (url, filename) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const durationInMonths = (
      parseInt(selectedDuration.replace(' month', '')) || 1
    ).toString()

    const totalPriceInt = Math.round(totalPrice).toString()
    const selectedPaymentMethodId = paymentData?.data?.paymentMethods.find(
      (method) => method.title === selectedPaymentMethod
    )?.id

    const PaymentDatas = new FormData()

    PaymentDatas.append('duration', durationInMonths)
    PaymentDatas.append('total_amount', totalPriceInt)
    PaymentDatas.append('payment_method', selectedPaymentMethodId)

    PaymentDatas.append('images', selectedFile, selectedFile.name)

    handleSubmitPayment(id, PaymentDatas)
  }

  const handleSubmitPayment = async (id, PaymentDatas) => {
    console.log(id, PaymentDatas)
    try {
      const { data } = await updatePaymentMethod({
        id,
        PaymentDatas: PaymentDatas,
      })
      console.log('Response data:', data)

      alert('Payment submitted successfully!')
      console.log('Payment submitted successfully:', data)
    } catch (error) {
      console.error('Error submitting payment:', error)
      alert('Error submitting payment. Please try again.')
    }
  }
  const isMid = useMediaQuery('(max-width:1300px)')
  const isSm = useMediaQuery('(max-width:900px)')
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{
            color: '#434345',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '24px',
            letterSpacing: '0.25px',
          }}
        >
          Service Payment
        </Typography>
        <div
          style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}
        >
          <Link
            href="/dashboard"
            style={{ textDecoration: 'none', color: '#434345' }}
          >
            <span
              style={{
                fontWeight: '400',
                marginRight: '10px',
                fontSize: '16px',
              }}
            >
              Home
            </span>{' '}
            <span style={{ marginLeft: '10px', marginRight: '10px' }}>/</span>
          </Link>
          <Link
            href="/dashboard/myplansbiraj"
            style={{ textDecoration: 'none', color: '#434345' }}
          >
            <span
              style={{
                fontWeight: '400',
                marginRight: '10px',
                marginLeft: '10px',
                fontSize: '16px',
              }}
            >
              My plans
            </span>{' '}
            <span style={{ marginLeft: '10px', marginRight: '10px' }}>/</span>
          </Link>
          <Link
            href="/dashboard/myplansbiraj/payment"
            style={{ textDecoration: 'none', color: 'gray' }}
          >
            <span
              style={{
                fontWeight: '400',
                fontSize: '16px',
                marginLeft: '10px',
              }}
            >
              Service Payment
            </span>
          </Link>
        </div>
      </div>
      <Box sx={{ display: 'flex', flexDirection: isMid ? 'column' : 'row' }}>
        <Box sx={{ display: 'flex', flex: '1', flexDirection: 'column' }}>
          <Typography
            style={{
              fontWeight: '500',
              fontSize: '24px',
              color: '#434345',
              marginTop: '30px',
            }}
          >
            {search} Package - {initialPrice}
          </Typography>
          <Box>
            <Typography>Duration</Typography>
            <FormControl
              sx={{
                marginTop: 2,
                width: isSm ? '320px' : isMid ? '420px' : '520px',
              }}
            >
              <InputLabel
                htmlFor="demo-simple-select-label"
                sx={{ marginBottom: '20px' }}
              ></InputLabel>
              <Select value={selectedDuration} onChange={handleDurationChange}>
                <MenuItem value="1 month">1 month</MenuItem>
                <MenuItem value="6 months">6 months</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ marginTop: '16px' }}>
              <Typography>Total Amount</Typography>
              <TextField
                style={{
                  width: isSm ? '320px' : isMid ? '420px' : '520px',
                  marginTop: '8px',
                }}
                value={initialPrice * priceMultiplier}
                readOnly
              />
            </Box>
            <Typography>Payment Method</Typography>
            <FormControl
              sx={{
                marginTop: 2,
                width: isSm ? '320px' : isMid ? '420px' : '520px',
              }}
            >
              <InputLabel
                htmlFor="demo-simple-select-label"
                sx={{ marginBottom: '20px' }}
              ></InputLabel>
              <Select
                value={selectedPaymentMethod}
                onChange={handlePaymentMethodChange}
              >
                {paymentData &&
                  paymentData.data &&
                  paymentData.data.paymentMethods &&
                  paymentData.data.paymentMethods.map((method) => (
                    <MenuItem key={method.id} value={method.title}>
                      {method.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>

          {selectedMethod && (
            <Box sx={{ marginTop: '40px' }}>
              <Image
                src={selectedMethod.qr_image}
                alt={`${selectedMethod.title} QR Code`}
                width={200}
                height={170}
              />
            </Box>
          )}

          <Typography
            sx={{
              display: 'flex',
              width: '150px',
              marginLeft: '40px',
              marginTop: '20px',
            }}
            onClick={handleDownloadQR}
          >
            {' '}
            <DownloadIcon />
            Download QR
          </Typography>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}
          >
            <Typography
              sx={{ color: '#FF0000', fontSize: '17px', fontWeight: '700' }}
            >
              Note:
            </Typography>
            <Typography
              sx={{
                width: '525px',
                height: '58px',
                fontSize: '14px',
                fontWeight: '400',
              }}
            >
              Once you done with the payment, please must attach your successful
              payment screenshot clicking the below button and submit it.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flex: '1',
            marginTop: isMid ? '20px' : '70px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{ width: '146px', fontWeight: '500', fontSize: '18px' }}
            >
              Add Screenshot
            </Typography>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />

            <Button
              variant="contained"
              onClick={() => {
                document.getElementById('fileInput').click()
              }}
              sx={{
                backgroundColor: 'white',
                color: '#22408B',
                '&:hover': {
                  backgroundColor: 'white',
                },
                height: '48px',
                width: '180px',
                marginTop: '7px',
              }}
            >
              +Add screenshot
            </Button>

            <Box sx={{ marginTop: '10px' }}>
              {selectedFile && (
                <>
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Uploaded Image"
                    width={350}
                    height={300}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 'green',
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body1">100%</Typography>
                  </Box>
                </>
              )}
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#22408B',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#22408B',
                },
                height: '48px',

                width: '180px',
                marginTop: '20px',
              }}
              onClick={handleFormSubmit}
            >
              + Submit payment
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default Payment
