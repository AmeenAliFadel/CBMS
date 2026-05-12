import React from 'react'

export default function LoginPage() {
  return (
    <div className="page-wrapper">

  <div className="card">

    <div className="card-header">
      <h1>Welcome Back</h1>
      <p>Sign in to manage your luxury fleet access.</p>
    </div>

    <div className="form">

      <div className="field">
        <label htmlFor='email-address'>Email Address</label>
        <input type="email" id='email-address' />
      </div>

      <div className="field">
        <div className="field-header">
          <label htmlFor='password'>Password</label>
          <a href="#">Forgot password?</a>
        </div>
        <div className="input-wrapper">
          <input type="password" id='password' />
          <button>Show</button>
        </div>
      </div>

    </div>

    <button className="signin-btn">Sign In</button>

    <div className="divider">
      <span>---</span>
      <p>OR SIGN IN WITH</p>
      <span>---</span>
    </div>

    <div className="social-btns">
      <button>Google</button>
      <button>Apple</button>
    </div>

    <p className="footer-text">
      Don't have an account? <a href="#">Sign up for free</a>
    </p>

  </div>

</div>
  )
}
