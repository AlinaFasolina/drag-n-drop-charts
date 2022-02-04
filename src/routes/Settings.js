import { Helmet } from 'react-helmet'
import { useAuth0 } from "@auth0/auth0-react";
import { MdVerified } from 'react-icons/md'
import { BiLogIn as LoginIcon } from 'react-icons/bi'

export default function Settings () {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>

      <div className="w-full h-screen pl-16 bg-base flex justify-center items-center
                      transition-all duration-150 ease-linear">
        <section className='bg-component rounded-xl shadow p-5 min-w-[50%]'>
          <div className='flex flex-row justify-between items-center'>
            <div>
              <div className='relative flex items-center text-normal'>
                <MdVerified className='absolute w-8 h-8' />
                <h3 className='text-3xl leading-6 font-bold pr-3 pl-10'>User Information</h3>
              </div>
              <p className='my-5 max-w-2xl text-sm text-gray-500'>Personal details and additional information</p>
            </div>
            <div className='items-center'>
              { isAuthenticated ? (
                <img src={user.picture} className='w-12 h-12 rounded-2xl'/>
              ) : (
                <LoginIcon className='relative w-8 h-8 cursor-grab text-normal' onClick={() => loginWithRedirect()}/>
              ) }
            </div>
          </div>

          <div className='border-t border-light-100 dark:border-night-400 border-dashed'>
            <dl>
            <div className="bg-component px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-xl font-medium text-normal">Full name</dt>
              <dd className="mt-1 text-lg text-contrast sm:mt-0 sm:col-span-2">
                { isAuthenticated ? user.name : "Please log in"}
              </dd>
            </div>

            <div className="bg-component px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-xl font-medium text-normal">Email Address</dt>
              <dd className="mt-1 text-lg text-contrast sm:mt-0 sm:col-span-2">
                { isAuthenticated ? user.email : "Please log in"}
              </dd>
            </div>

            <div className="bg-component px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-xl font-medium text-normal">Subscription Status</dt>
              { isAuthenticated ? (
                <dd className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-night-400 to-night-100">
                  Valid
                </dd>
              ) : (
                <dd className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                  Invalid
                </dd>
              ) }
              
            </div>
            </dl>
          </div>
        </section>
      </div>
    </>
  )
}