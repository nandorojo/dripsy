import { View } from 'dripsy'

export function App() {
  return (
    <View
      sx={{
        // now we can use any value we want!
        backgroundColor: '#333',
        paddingTop: '$3',
        mb: '$none',
        // let's make a value responsive!
        marginX: ['$0', null, '$3'],
        // let's restrict usage to theme values!
        marginTop: 10,
      }}
    />
  )
}
