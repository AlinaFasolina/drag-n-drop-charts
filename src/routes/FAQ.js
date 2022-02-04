import { Disclosure } from '@headlessui/react'
import { FaArrowDown as ArrowDown } from 'react-icons/fa'

export default function FAQ() {
  return (
    <div className="w-full h-screen px-4 pt-16 bg-light-100 dark:bg-night-100
                    transition-all duration-150 ease-linear">
      <div className="w-full max-w-xl p-2 mx-auto bg-light-200 dark:bg-night-200 rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="faq-header">
                <span>💸 What is your refund policy?</span>
                <ArrowDown
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-light-400 dark:text-night-400`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="faq-answer">
                Unfortunately, all subscriptions are final and are not refundable. We have provided more than enough information
                about the subscriptions. Please contact us if you have any queries.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
            <Disclosure.Button className="faq-header">
                <span>🛠 Do you offer technical support?</span>
                <ArrowDown
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-light-400 dark:text-night-400`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="faq-answer">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}
