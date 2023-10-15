'use client'

import React, { Fragment, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  DialogHeader,
  DialogBody,
  Input,
  Textarea,
  DialogFooter,
  Dialog as Dialog1,
  Spinner
} from "@material-tailwind/react";

import {
  BuildingStorefrontIcon,
  UserCircleIcon,
  HomeIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  MagnifyingGlassIcon,
  Bars2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { techCategories } from "@components/data";
import { Badge, Icon } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import { clearCart, updateAuthId } from "@auth/redux/dataSlice";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
 
// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const renderItems = techCategories.map(({ name, icon, id }) => (
    <Link href={`/category/${id}/1`} key={name}>
      <MenuItem>
        <Typography variant="h6" color="blue" className="mb-1">
          <Icon>{icon}</Icon>
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {name}
        </Typography>
      </MenuItem>
    </Link>
  ));
 
  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Categories{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-full grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="white"
            shadow={false}
            style={{border:'1px solid blue'}}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center"
          >
          <img src="/media/images/logo2.jpg" style={{height:200}} alt="logo" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1"
          style={{
            maxHeight: "calc(50vh - 4rem)",
            overflow: "auto",
            display: "flex",
            flexWrap: "wrap"
          }}
          >
            {techCategories.map(({ name, icon, id }) => (
              <Link href={`/category/${id}/1`} key={name}>
                <MenuItem style={{display:'flex', alignItems:'center'}}>
                  <Typography variant="h6" color="blue">
                  <Icon>{icon}</Icon>
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal ml-3">
                    {name}
                  </Typography>
                </MenuItem>
              </Link>
            ))}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Categories{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden"
      style={{
        maxHeight: "calc(70vh - 4rem)",
        overflow: "auto",
      }}
      >
        {renderItems}
      </ul>
    </React.Fragment>
  );
}
 
// nav list component
const navListItems = [
  {
    label: "Search",
    icon: MagnifyingGlassIcon,
    link: "/searches",
  },
  {
    label: "Home",
    icon: HomeIcon,
    link: "/",
  },
  {
    label: "Electrika Shop",
    icon: BuildingStorefrontIcon,
    link: "/shop/1",
  },
];
 
function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      
      {navListItems.map(({ label, icon, link }, key) => (
        <Typography
          key={label}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
         <Link href={`${link}`}>
         <MenuItem className="flex items-center gap-2 lg:rounded-full">
         {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
         {label}
       </MenuItem>
         </Link>
        </Typography>
      ))}
      <NavListMenu />
    </ul>
  );
}
 
export default function Header() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const total = useSelector((state) => state.total);
  const dispatch = useDispatch();
  const authId = useSelector((state) => state.authId);
  const cart = useSelector((state) => state.cart);
  const [openQuote, setOpenQuote] = React.useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const receiver = '+254713441634';
  const currentUser = useSelector((state) => state.user);
  let user = ''
  const history = useRouter()

  try {
    user = JSON.parse(currentUser);
  } catch (error) {
    // Handle the error or log it, if needed
    console.error('Error parsing currentUser:', error);
  }

  const submitQuote = () => {
    setLoading(true);
    if (name === '' || email === '' || phoneNumber === '' || message === '') {
      toast.error('Please fill all fields!', {
        position: toast.POSITION.TOP_CENTER
      });
      setLoading(false);
      return;
    } else {
      const senderDetails = `*Quote Request*\n*Name:* ${name}\n*Phone Number:* ${phoneNumber}\n*Email:* ${email}`;
      const messageWithSenderDetails = `${senderDetails}\n\n*Message*\n${message}`;
    
      const formattedMessage = encodeURIComponent(messageWithSenderDetails);

      const whatsAppLink = `https://api.whatsapp.com/send?phone=${receiver}&text=${formattedMessage}`;
  
      window.open(whatsAppLink, '_blank');
      setLoading(false);
      setName('');
      setEmail('');
      setPhoneNumber('');
      setMessage('');
      setOpenQuote(false);
    }
  };
 
  const handleOpenQuote = () => setOpenQuote(!openQuote);
 
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const clearAllCartItems = () => {
    dispatch(clearCart());
    toast.warn(`Your cart has been cleared!`,{
      position: "top-center",
    })
    setOpenCartModal(false)
  }

 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);


  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const sendtoWhatsapp = async () => {
    try {
      const totalPrice = addCommasToNumber(total?.toFixed(2));

      const formattedCartItems = cart?.map((item, index) => {
        const formattedPrice = parseFloat(item.price).toLocaleString('en-US', { style: 'currency', currency: 'KES' });
        const subTotal = addCommasToNumber((item.price * item.quantity)?.toFixed(2));
      
        return `*Item ${index + 1}:*\n*Name:* ${item.name}\n*Quantity:* ${item.quantity}\n*Price:* ${formattedPrice}\n*Sub-Total Price:* KES ${subTotal}\n*Link:* ${item.link}`;
      }).join('\n\n');
      
      const formattedTotalPrice = totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'KES' });
      
      const messageWithSenderDetails = `*My Orders:*\n\n${formattedCartItems}\n\n*Total Price:* KES ${formattedTotalPrice}`;
      
      const whatsAppLink = `https://api.whatsapp.com/send?phone=${receiver}&text=${encodeURIComponent(messageWithSenderDetails)}`;
      
      window.open(whatsAppLink, '_blank');
      
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Error sending cart items:', error,{
        position: toast.POSITION.TOP_CENTER
      });
    }
};

const logout = () => {
  setIsMenuOpen(false)
  Swal.fire({
    icon: "success",
    title: "Logged out successfully!",
    text: "See you back soon!",
    showConfirmButton: false,
    timer: 3000,
  });
  dispatch(updateAuthId(""));
  history.push("/login");
};
 
  return (
    <>
    <Navbar style={{zIndex:100}} className="mx-auto max-w-screen-xl p-2  fixed top-0 left-0 right-0">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          <Link href="/">
          <img src="/media/images/logo.jpg" style={{height:35}} alt="Electrika Computers" />
          </Link>
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
      
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">

        <MenuHandler>
        {authId ?(
          <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt={user.firstName}
            className="border border-blue-900 p-0.5"
            src={user.profile}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
        ):(
          <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto p-2"
        >
          <span><AccountCircleIcon fontSize="medium"/></span>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
        )}

      </MenuHandler>
      <Badge className="mr-5" onClick={() => setOpenCartModal(true)} color="primary" style={{ cursor: 'pointer' }} badgeContent={cart.length}>
      <span>
        <ShoppingCartIcon style={{color:'#808080'}}/>
      </span>
    </Badge>

    <Button onClick={handleOpenQuote} variant="outlined" style={{color:'blue', border: '1px solid blue'}}>
    Get Quote    
    </Button>
        <MenuList className="p-1">
          {authId ?(
           <>
           <MenuItem
           onClick={() => setIsMenuOpen(false)}
           style={{ display: "flex", alignItems: "center" }}
         >
           <span>
             <UserCircleIcon className="h-4 w-4" />
           </span>
           <Typography
             as="span"
             variant="small"
             className="font-normal"
             color="inherit"
             style={{ marginLeft: "5px" }}
           >
             {user.firstName} {user.lastName}
           </Typography>
         </MenuItem>

           <MenuItem
           onClick={logout}
           style={{ display: "flex", alignItems: "center" }}
         >
           <span>
             <PowerIcon className="h-4 w-4 text-red-500" />
           </span>
           <Typography
             as="span"
             variant="small"
             className="font-normal"
             color="red"
             style={{ marginLeft: "5px" }}
           >
             Sign Out
           </Typography>
         </MenuItem>
           </>
          ):(
            <>
            <MenuItem
            className="flex items-center gap-2 rounded "
            >
            <Button onClick={() => setIsMenuOpen(false)} fullWidth style={{backgroundColor:'blue'}}>
            <Link href="/login">Login</Link>
            </Button>
            </MenuItem>

            <MenuItem
            className="flex items-center gap-2 rounded "
            >
            <Button onClick={() => setIsMenuOpen(false)} fullWidth style={{backgroundColor:'blue'}}>
            <Link href="/register">Register</Link>
            </Button>
            </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>

    <Transition.Root show={openCartModal} as={Fragment}>
    <Dialog style={{zIndex:101}} as="div" className="relative z-10" onClose={() => setOpenCartModal(false)}>
      <Transition.Child
        as={Fragment}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                      <span style={{
                        border:'1px solid #5C5CFF',
                        height:35,
                        padding:8,
                        borderRadius:5,
                        color:'#5C5CFF',
                        cursor:'pointer',
                       }}
                       onClick={clearAllCartItems}
                       >
                       Clear
                       </span>
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpenCartModal(false)}
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                  
                          <div class="py-6">
                            <div class="flow-root">
                              <Cart />
                            </div>
                  

                            <div style={{background: '#fff'}} class="mt-6 flex items-center justify-between">
                              <p class="text-sm font-medium text-gray-400">Total</p>
                              <p class="text-2xl font-semibold text-blue-900"><span class="text-xs font-normal text-gray-400">KES</span> {numberWithCommas(parseFloat(total).toFixed(2))}</p>
                            </div>

                            {cart.length > 0 &&(
                              <div class="mt-6 text-center">
                              <button onClick={sendtoWhatsapp} type="button" class="group inline-flex w-full items-center justify-center rounded-md bg-blue-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-blue-800">
                                Checkout
                                <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </button>
                            </div>
                            )}
                          </div>
                  
                  </div>

   
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Dialog>
  </Transition.Root>




  <Dialog1 open={openQuote} handler={handleOpenQuote} onClose={() => setOpenQuote(false)}>
  <div className="flex items-center justify-between">
    <DialogHeader style={{color:'#42a5f5'}}>Quote Form</DialogHeader>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="mr-3 h-5 w-5"
      onClick={handleOpenQuote}
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  </div>
  <DialogBody divider>
  <ToastContainer />
    <div className="grid gap-6">
      <Input value={name} onChange={(e) => setName(e.target.value)} color="blue" label="Full Name" />
      <Input value={email} onChange={(e) => setEmail(e.target.value)} color="blue" label="Email" type="email"/>
      <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} color="blue" label="Phone" />
      <Textarea value={message} onChange={(e) => setMessage(e.target.value)} color="blue" label="Message" />
    </div>
  </DialogBody>
  <DialogFooter className="space-x-2">
    <Button variant="outlined" color="red" onClick={handleOpenQuote}>
      close
    </Button>
    <Button onClick={submitQuote} variant="gradient" color="blue">
      {loading ? <Spinner color="blue" /> : 'Submit'}
    </Button>
  </DialogFooter>
</Dialog1>
    </>
  );
}