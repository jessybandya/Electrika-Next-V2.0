import { decreaseQuantity, increaseQuantity, removeFromCart } from '@auth/redux/dataSlice';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
function Cart() {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleDecreaseQuantity = item => {
        dispatch(decreaseQuantity(item));
      };
    
      const handleIncreaseQuantity = item => {
        dispatch(increaseQuantity(item));
      };

      const handleRemoveFromCart = (itemId, name) => {
        dispatch(removeFromCart({ id: itemId }));
        toast.warn(`"${name}" has been removed from your cart!`,{
                  position: "top-center",
        })
      };

  return (  
    <ul class="-my-8"
    style={{
        maxHeight:'calc(100vh - 200px)',
        overflowY:'auto',
        overflowX:'hidden',
        
      }}
    >
    {cart.length === 0 ?(
        <div style={{color:'#88888888'}} className="flex flex-col items-center justify-center">
           <i>Your Cart is Empty</i>
        </div>
    ):(
        <>
        {cart.map((product) => (
          <li key={product.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={product.image}
                alt="Image"
                className="h-24 w-24 max-w-full rounded-lg object-cover"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a className="text-base font-semibold text-blue-500" href="#">{product.name}</a>
                  </h3>
                  <p style={{fontSize:15, fontWeight:'bold'}} className="ml-4 text-blue-900">
                  {numberWithCommas(parseFloat(product.price * product.quantity).toFixed(2))}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {numberWithCommas(parseFloat(product.price).toFixed(2))} x {product.quantity}
                </p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="mx-auto flex mt-2 h-8 items-stretch text-gray-600">
                <button onClick={() => handleDecreaseQuantity(product)} class="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-blue-400 hover:text-white">-</button>
                <div class="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{product.quantity}</div>
                <button onClick={() => handleIncreaseQuantity(product)} class="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-blue-400 hover:text-white">+</button>
                </p>

                <div className="flex">
                <DeleteIcon
                onClick={() =>
                  handleRemoveFromCart(product.id, product.name)
                }
                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"/>
                </div>
              </div>
            </div>
          </li>
        ))}
        </>
    )}
  </ul>
  )
}

export default Cart