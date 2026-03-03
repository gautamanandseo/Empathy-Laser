import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Radiance Laser Clinic</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to our homepage." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--light-purple)] to-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-9xl font-bold text-gradient mb-4"
          >
            404
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-[var(--text-light)] mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-[var(--primary-purple)] text-[var(--primary-purple)] hover:bg-[var(--light-purple)]"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Go Back
            </Button>
            
            <Button
              onClick={() => navigate('/')}
              className="purple-gradient text-white hover:opacity-90"
            >
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;