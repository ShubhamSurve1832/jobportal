'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

export default function AuthorizeCandidate(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const user = secureLocalStorage.getItem('Candidate');
    const userIsAuthenticated = user !== null;

    useEffect(() => {
        if (!userIsAuthenticated) {
          router.replace('/job/CandidateLogin')
        }else{
          secureLocalStorage.removeItem('RecID')
          secureLocalStorage.removeItem('SIMTK')
          secureLocalStorage.removeItem('SIMLoginData')
        }

    }, [userIsAuthenticated, router]);

    if(userIsAuthenticated){
      return <Component {...props} />
    }else{
      return (<h1 className='text-center m-4'><img src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="Loader" /></h1>)
    }
  };
}