import { Children } from 'preact/compat'
import ChildrenProp from 'models/ChildrenProp'
import Record from 'components/OrderedList/Record'

export default function ({ children }: ChildrenProp) {
  return (
    <>
      {Children.map(children, (child, index) => {
        return <Record index={index + 1}>{child}</Record>
      })}
    </>
  )
}
