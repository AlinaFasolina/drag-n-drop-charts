import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function Disclaimer() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-bold text-light-500 dark:text-night-500
                    dark:hover:text-night-400 hover:text-light-400
                    ">
          Disclaimer
        </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle 
                              transition-all transform bg-light-200 dark:bg-night-200
                              shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-extrabold text-light-400 dark:text-night-400 text-left"
                >
                  🚨 Disclaimer 🚨
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-light-400 dark:text-night-300 text-left">
                    The information contained herein is for informational purposes only and shall not be used as financial advise. 
                    Nothing herein shall be construed to be financial, legal or tax advice. 
                    The content of this article is solely the opinions of our team who are not licensed financial advisors nor registered investment advisors. 
                    Trading cryptocurrencies poses considerable risk of loss. We do not guarantee any particular outcome.
                  </p>
                </div>

                <div className="mt-4 text-right">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium
                            text-light-200 hover:text-light-400 dark:text-night-200 hover:dark:text-night-400
                            bg-light-400 hover:bg-light-100 dark:bg-night-400 dark:hover:bg-night-100
                              border border-transparent rounded-md 
                              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                              focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
