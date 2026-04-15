import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { Shield, Lock, Mail, Zap } from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (email && password) {
      dispatch(setCredentials({ email, name: 'Chief Officer', role: 'Admin' }));
      window.location.href = '/';
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#0A0A0A] text-on-surface selection:bg-primary selection:text-black">
      {/* Left side: Branding & Visuals */}
      <section className="hidden md:flex md:w-1/2 relative flex-col justify-between p-16 overflow-hidden border-r border-white/5 bg-[#0D0D0D]">
        <div className="relative z-10 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center shadow-[0_0_20px_rgba(135,173,255,0.3)]">
              <Zap size={24} className="text-on-primary-fixed fill-current" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tighter text-white block leading-none">LUMINOUS</span>
              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-primary italic">Ops Center</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-lg mb-20 animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
          <h2 className="text-6xl font-black leading-[0.9] tracking-tighter text-white mb-8">
            Orchestrate <br/> 
            <span className="text-primary italic">Brilliance.</span>
          </h2>
          <p className="text-xl text-on-surface-variant font-medium leading-relaxed opacity-80">
            The next generation of team management is here. Seamless workflows, deep analytics, and an atmospheric interface built for absolute clarity.
          </p>
        </div>

        <div className="relative z-10 flex gap-12 animate-in fade-in slide-in-from-left-12 duration-700 delay-200">
          <div>
            <div className="text-3xl font-black text-white tracking-tighter">12k+</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-50 mt-1">Active Clusters</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white tracking-tighter">99.9%</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-50 mt-1">Uptime SLA</div>
          </div>
        </div>

        {/* Backdrop Visuals */}
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-primary/20 via-primary/5 to-transparent opacity-40"></div>
        
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
        
        {/* Abstract Background Image */}
        <img 
          className="absolute inset-0 w-full h-full object-cover opacity-15 grayscale contrast-[1.2] blend-luminosity" 
          alt="Abstract structural architecture with glass and neon" 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
        />
      </section>

      {/* Right side: Login Form */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-8 bg-[#0A0A0A] relative overflow-hidden">
        {/* Mobile Logo */}
        <div className="md:hidden absolute top-8 left-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Zap size={20} className="text-black fill-current" />
          </div>
        </div>

        <div className="w-full max-w-md space-y-12 relative z-10 animate-in fade-in zoom-in-95 duration-700">
          <header className="text-left">
            <h1 className="text-4xl font-black tracking-tighter text-white mb-3">Welcome Back</h1>
            <p className="text-on-surface-variant font-medium text-lg leading-relaxed opacity-70 italic">Continue your journey with the world's most precise team platform.</p>
          </header>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high border border-white/5 transition-all group active:scale-[0.98]">
                <img alt="Google" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATAwNYkraKK6W2EnAO8nby6ZgogHQWv5-emsvyWamy0hk5b0kYcr8DRNcEkPVmABG0Bu34X-8ZBYqs1Mbwlbj0XmTTL1Qq-ZwfGVRBQuzr9-JBWo6A-0szLxlc0oO2wgJ6DyNkc7Qj2Afj9YdANc43iEUI7io8RfokOgDl9eyW6eHFb9iBtEtLWWHL0W32v_FsAV1P8EdfgYOH0LeG6dGbznBTOl2L8-lQpF7wKAPCv6KoZKN9utpJP_OM9CTy-mdkHTvliJUUQbw8" />
                <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant group-hover:text-white transition-colors">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high border border-white/5 transition-all group active:scale-[0.98]">
                <svg className="w-5 h-5 fill-on-surface-variant group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant group-hover:text-white transition-colors">GitHub</span>
              </button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-6 text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant opacity-30">or verify with</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-1 opacity-60" htmlFor="email text-glow">Work Email</label>
                <div className="relative flex items-center group">
                  <div className="absolute left-5 text-on-surface-variant group-focus-within:text-primary transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    className="w-full bg-[#141414] border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-white placeholder:text-white/10 focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all outline-none" 
                    id="email" 
                    placeholder="name@company.com" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60" htmlFor="password">Password</label>
                  <a className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors" href="#">Forgot Credentials?</a>
                </div>
                <div className="relative flex items-center group">
                  <div className="absolute left-5 text-on-surface-variant group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    className="w-full bg-[#141414] border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-white placeholder:text-white/10 focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all outline-none" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 px-1">
                <div className="relative flex items-center">
                  <input 
                    className="appearance-none w-5 h-5 rounded-lg border-2 border-white/5 bg-[#141414] checked:bg-primary checked:border-primary transition-all cursor-pointer outline-none" 
                    id="remember" 
                    type="checkbox" 
                  />
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-black font-black text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity">
                    ✓
                  </div>
                </div>
                <label className="text-xs font-bold text-on-surface-variant cursor-pointer select-none opacity-60 hover:opacity-100 transition-opacity" htmlFor="remember">Keep session persistent</label>
              </div>

              <button 
                className="w-full py-5 bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed font-black uppercase tracking-[0.3em] text-xs rounded-2xl shadow-[0_12px_48px_-12px_rgba(135,173,255,0.4)] hover:shadow-primary/40 active:scale-[0.98] transition-all relative overflow-hidden group" 
                type="button" 
                onClick={handleSignIn}
              >
                <span className="relative z-10">Access Dashboard</span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-500"></div>
              </button>
            </form>
          </div>

          <footer className="text-center pt-6">
            <p className="text-sm font-medium text-on-surface-variant opacity-60 hover:opacity-100 transition-opacity">
              Don't have access?
              <a className="text-primary font-black hover:underline underline-offset-8 ml-2 italic tracking-tight" href="#">Join the Hub</a>
            </p>
          </footer>

          <div className="flex justify-center gap-8 pt-12 border-t border-white/5 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <a className="text-[9px] font-black uppercase tracking-[0.4em] text-white hover:text-primary" href="#">Privacy</a>
            <a className="text-[9px] font-black uppercase tracking-[0.4em] text-white hover:text-primary" href="#">Terms</a>
            <a className="text-[9px] font-black uppercase tracking-[0.4em] text-white hover:text-primary" href="#">Security</a>
          </div>
        </div>

        {/* Floating background elements for depth */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
      </section>
    </main>
  );
};

export default Login;
