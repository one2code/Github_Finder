import LoadingSpinner from './assets/spinner.gif'

// Loading spinner component that imports our spinner.gif to be displayed
function Spinner() {
  return (
    <div className="w-100 mt-20 ">
        <img width = {180} className= 'text-center nx-auto' src={LoadingSpinner} alt="Loading...." />
    </div>
  )
}
export default Spinner