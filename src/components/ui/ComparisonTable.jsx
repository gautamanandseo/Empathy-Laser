import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const ComparisonTable = ({
  title = 'Service Comparison',
  columns = ['Traditional', 'Our Technology'],
  rows = [],
}) => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See why we're the preferred choice for advanced aesthetic treatments
          </p>
        </motion.div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden"
          >
            <table className="w-full">
              {/* Header */}
              <thead>
                <tr className="bg-gradient-to-r from-orange-50 to-red-50">
                  <th className="px-6 py-4 text-left font-bold text-gray-900 text-lg">
                    Features
                  </th>
                  {columns.map((col, idx) => (
                    <th
                      key={idx}
                      className={`px-6 py-4 text-center font-bold text-lg ${
                        idx === columns.length - 1
                          ? 'bg-gradient-to-br from-orange-100 to-red-100 text-transparent bg-clip-text'
                          : 'text-gray-700'
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {rows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className={`border-t border-neutral-200 hover:bg-orange-50/30 transition-colors ${
                      rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {row.feature}
                    </td>
                    {row.items.map((item, itemIdx) => (
                      <td key={itemIdx} className="px-6 py-4 text-center">
                        {typeof item === 'boolean' ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: (rowIdx * columns.length + itemIdx) * 0.05 }}
                            viewport={{ once: true }}
                          >
                            {item ? (
                              <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="w-6 h-6 text-gray-300 mx-auto" />
                            )}
                          </motion.div>
                        ) : (
                          <span className={`text-sm font-medium ${
                            itemIdx === columns.length - 1
                              ? 'text-orange-600 font-bold'
                              : 'text-gray-600'
                          }`}>
                            {item}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
