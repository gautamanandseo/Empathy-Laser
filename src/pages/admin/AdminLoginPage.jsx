import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isAuthenticated } = useAuth(); // Updated to use signIn
  const { toast } = useToast();

  const from = location.state?.from?.pathname || "/admin/dashboard";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please enter both email and password."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signIn(email, password);

      if (result.success) {
        toast({
          title: "Welcome back",
          description: "Logged in successfully",
          className: "bg-green-600 text-white border-none"
        });
        // Navigation handled by useEffect
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: result.error?.message || "Invalid email or password."
        });
      }
    } catch (err) {
      console.error("Login exception:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white font-playfair mb-2">Admin Portal</h1>
          <p className="text-gray-400 text-sm">Secure access for authorized personnel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white focus:border-red-500 outline-none transition-colors"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white focus:border-red-500 outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg rounded-xl font-bold transition-all shadow-lg hover:shadow-red-900/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              <>
                Sign In <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-8 text-center">
            <p className="text-xs text-gray-600">
                Protected by secure encryption. Unauthorized access is prohibited.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;