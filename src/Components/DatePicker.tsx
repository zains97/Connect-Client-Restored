import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const DatePicker = (props: Props) => {
  return (<View>
    <Button onPress={() => setOpen(true)}>Date Of Birth</Button>
    <DatePicker
      modal
      mode="date"
      open={open}
      date={date}
      onConfirm={date => {
        setOpen(false);
        setDate(date);
      }}
      onCancel={() => {
        setOpen(false);
      }}
    />
  </View>>
  )
}

export default DatePicker

const styles = StyleSheet.create({})