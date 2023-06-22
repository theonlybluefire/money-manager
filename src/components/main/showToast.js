import * as bootstrap from 'bootstrap';

const showToast = (id) => {
    const toastToShow = document.getElementById('id')
    const toast = new bootstrap.Toast(toastToShow)
    toast.show()
}
export default showToast