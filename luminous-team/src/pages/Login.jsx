import React from 'react';

const Login = () => {
  return (
    <main className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-surface-container-lowest text-on-surface">
      <section className="hidden md:flex md:w-1/2 relative flex-col justify-between p-12 overflow-hidden border-r border-outline-variant/10">
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-fixed" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-on-surface">Luminous Team</span>
          </div>
        </div>
        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl font-bold leading-tight tracking-tighter text-on-surface mb-6">
            Orchestrate <span className="text-primary">Brilliance.</span>
          </h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            The next generation of team management is here. Seamless workflows, deep analytics, and an atmospheric interface built for clarity.
          </p>
        </div>
        <div className="relative z-10 flex gap-8">
          <div>
            <div className="text-2xl font-bold text-on-surface">12k+</div>
            <div className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Active Teams</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface">99.9%</div>
            <div className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Uptime SLA</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent opacity-30"></div>
        <img className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" alt="abstract architectural geometry with deep blue highlights and sharp shadows on a pure black background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNSten9AP2ee1VngTStW00TR6Wa96n8NB0PEzbe3F1Xmcq2Dzu9FDCdEM2Yr5QrGu32arYoyetEfNPxIbK4dRVH07HUsCktNRgG2LCxh9Lr495weuvfC4WF8HPV7-qfR6mVrXd-fJqeiPRKmTswqCYmvjDbZQcQ4KYkKfWvIyOV1yArVC5FTpGc7fsPlmYxNQYxCqYnK9aHnocrsyidVA7CvVkx8wKedahX_N0FuFbGAm-07wTxvQ8hmuBboAe_anfG6DEnQPct2q5" />
      </section>

      <section className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-10">
          <header className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tighter text-on-surface mb-2">Welcome Back</h1>
            <p className="text-on-surface-variant font-medium">Continue your journey with the world's most precise team platform.</p>
          </header>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/20 transition-all group">
                <img alt="Google" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATAwNYkraKK6W2EnAO8nby6ZgogHQWv5-emsvyWamy0hk5b0kYcr8DRNcEkPVmABG0Bu34X-8ZBYqs1Mbwlbj0XmTTL1Qq-ZwfGVRBQuzr9-JBWo6A-0szLxlc0oO2wgJ6DyNkc7Qj2Afj9YdANc43iEUI7io8RfokOgDl9eyW6eHFb9iBtEtLWWHL0W32v_FsAV1P8EdfgYOH0LeG6dGbznBTOl2L8-lQpF7wKAPCv6KoZKN9utpJP_OM9CTy-mdkHTvliJUUQbw8" />
                <span className="text-sm font-semibold">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/20 transition-all group">
                <svg className="w-5 h-5 fill-on-surface" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                <span className="text-sm font-semibold">GitHub</span>
              </button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-outline-variant/10"></div>
              <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-[0.2em] text-outline">or continue with</span>
              <div className="flex-grow border-t border-outline-variant/10"></div>
            </div>

            <form className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1" htmlFor="email">Work Email</label>
                <div className="relative flex items-center group glow-focus">
                  <span className="material-symbols-outlined absolute left-4 text-outline group-focus-within:text-primary transition-colors">alternate_email</span>
                  <input className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" id="email" placeholder="name@company.com" type="email" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="password">Password</label>
                  <a className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary-fixed-dim transition-colors" href="#">Forgot?</a>
                </div>
                <div className="relative flex items-center group glow-focus">
                  <span className="material-symbols-outlined absolute left-4 text-outline group-focus-within:text-primary transition-colors">lock</span>
                  <input className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-all outline-none" id="password" placeholder="••••••••" type="password" />
                </div>
              </div>

              <div className="flex items-center gap-2 px-1">
                <input className="w-4 h-4 rounded border-outline-variant/30 bg-surface-container-high text-primary focus:ring-primary focus:ring-offset-surface-container-lowest" id="remember" type="checkbox" />
                <label className="text-sm text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Remember this device</label>
              </div>

              <button className="w-full py-4 bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/25 active:scale-[0.98] transition-all" type="button" onClick={() => window.location.href='/'}>
                Sign In to HQ
              </button>
            </form>
          </div>

          <footer className="text-center pt-4">
            <p className="text-sm text-on-surface-variant">
              Don't have an account?
              <a className="text-primary font-bold hover:underline underline-offset-4 ml-1" href="#">Join Luminous</a>
            </p>
          </footer>

          <div className="flex justify-center gap-6 pt-12 border-t border-outline-variant/10">
            <a className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline hover:text-on-surface-variant transition-colors" href="#">Privacy</a>
            <a className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline hover:text-on-surface-variant transition-colors" href="#">Terms</a>
            <a className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline hover:text-on-surface-variant transition-colors" href="#">Security</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
