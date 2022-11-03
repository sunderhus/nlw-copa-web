import Image from 'next/image';
import appPreviewImage from '../assets/app-nlw-copa-preview.png';
import logoImage from '../assets/logo.svg';
import usersAvatarExample from '../assets/users-avatar-example.png';
import iconCheck from '../assets/icon-check.svg';
import { api } from '../lib/axios';

type Props ={
  poolCount:number;
  usersCount:number;
  guessesCount:number;
}

export default function Home(props:Props) {
  return (
    <div className='max-w-[1124px] mx-auto h-screen grid grid-cols-2 items-center gap-28'>
      <main>
        <Image src={logoImage} alt="logo image"/>
        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie sue próprio bolão da copa e compatilhe com seus amigos!</h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={usersAvatarExample} alt="users avatars"/>
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.usersCount}</span> pessoas já estão usando.
          </strong>
        </div>

        <form className='mt-10 flex gap-2'>
          <input 
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm'
            type="text"
            required 
            placeholder='Qual nome do seu bolão?'
          />
          <button 
            className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold font-sm uppercase hover:bg-yellow-700'
            type="submit"
          >Criar meu bolão</button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>Após criar seu bolão, você recebrá um código único de poderá usar para convidar outras pessoas.</p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100 items-center'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheck} alt="icon check"/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className='w-px h-14 bg-gray-600'></div>
          <div className='flex items-center gap-6'>
            <Image src={iconCheck} alt="icon check"/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessesCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image quality={100}  src={appPreviewImage} alt="two mobile devices running this application"/>
    </div>

  )
}


export const getServerSideProps = async ()=>{
 
  const [
    poolCountResponse,
    guessesCountResponse,
    usersCountResponse
  ] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count')
  ]);
  
  return {
    props:{
      poolCount:poolCountResponse.data.count,
      guessesCount:guessesCountResponse.data.count,
      usersCount:usersCountResponse.data.count
    }
  }
}