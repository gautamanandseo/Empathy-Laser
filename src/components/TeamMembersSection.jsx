import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, RefreshCw, User, Users } from 'lucide-react';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';

const TeamMembersSection = () => {
  const { data: team, loading, error, refresh } = useRealtimeSync('about_us_content', {
    eq: { column: 'section_name', value: 'team_members' },
    orderBy: { column: 'order', ascending: true }
  });

  // Debugging logs
  useEffect(() => {
    if (loading) {
      console.log('TeamMembersSection: Loading data...');
    } else if (error) {
      console.error('TeamMembersSection: Error loading data:', error);
    } else {
      console.log(`TeamMembersSection: Successfully loaded ${team?.length || 0} members.`, team);
    }
  }, [loading, error, team]);

  // Loading State
  if (loading) {
    return (
      <section className="py-24 bg-white" id="team-section">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-center items-center py-12">
               <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
               <span className="ml-3 text-gray-500">Loading team members...</span>
            </div>
         </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-24 px-6 max-w-7xl mx-auto" id="team-section">
        <Alert variant="destructive" className="bg-white border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unable to load team members</AlertTitle>
          <AlertDescription className="flex flex-col gap-3 mt-2">
            <p>We couldn't retrieve the team data at this time. Please try again.</p>
            <Button variant="outline" size="sm" onClick={refresh} className="w-fit gap-2">
              <RefreshCw className="w-3 h-3" /> Retry
            </Button>
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  // Empty State
  if (!team || team.length === 0) {
      return (
         <section className="py-24 bg-white text-center" id="team-section">
            <div className="max-w-md mx-auto px-6">
               <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
               <h3 className="text-lg font-semibold text-gray-900">Meet Our Team</h3>
               <p className="text-gray-500 mt-2">Team profiles are currently being updated.</p>
            </div>
         </section>
      );
   }

  return (
    <section className="py-24 bg-white" id="team-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[var(--primary-red)] font-semibold tracking-wider uppercase text-sm">Our Experts</span>
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mt-2 text-gray-900">Meet The Team</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 bg-gray-100">
                {member.image_url ? (
                  <img 
                    src={member.image_url} 
                    alt={member.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 flex-col gap-2">
                     <User className="w-16 h-16 text-gray-300" />
                     <span className="text-xs text-gray-400 font-medium">No Image</span>
                  </div>
                )}
                {/* Gradient Overlay for Bio on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                   <p className="text-white text-sm line-clamp-4 leading-relaxed">{member.description}</p>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">{member.title}</h3>
                <p className="text-[var(--primary-red)] font-medium text-sm mt-1 uppercase tracking-wide">
                  {member.details?.role || "Specialist"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembersSection;