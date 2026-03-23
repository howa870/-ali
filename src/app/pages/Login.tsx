import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

export default function Login() {

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>
      <h2>تسجيل دخول</h2>

      <button onClick={loginWithGoogle}>
        تسجيل الدخول بجوجل
      </button>
    </div>
  );
}
