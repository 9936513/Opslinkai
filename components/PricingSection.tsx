'use client'

import { motion } from 'framer-motion'
import { 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Phone,
  ArrowRight,
  Crown
} from 'lucide-react'

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "GPT-4V processing for individual agents",
    icon: Zap,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    popular: false,
    features: [
      "GPT-4V processing only",
      "500 documents/month",
      "85% accuracy guarantee",
      "Email support",
      "Basic analytics",
      "PDF & image support"
    ],
    cta: "Start Free Trial",
    ctaStyle: "bg-blue-600 hover:bg-blue-700"
  },
  {
    name: "Professional",
    price: "$149",
    period: "/month",
    description: "Smart AI routing for power users",
    icon: Star,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    popular: true,
    features: [
      "Smart AI routing (Claude + GPT-4V)",
      "2,000 documents/month",
      "92% accuracy guarantee",
      "Automatic fallback",
      "Priority support",
      "Advanced analytics",
      "API access",
      "Team collaboration"
    ],
    cta: "Start Free Trial",
    ctaStyle: "bg-orange-600 hover:bg-orange-700"
  },
  {
    name: "Business",
    price: "$399",
    period: "/month",
    description: "Ensemble validation for enterprises",
    icon: Shield,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    popular: false,
    features: [
      "Ensemble validation (both AIs)",
      "8,000 documents/month",
      "98% accuracy guarantee",
      "Human review queue",
      "Dedicated support",
      "Custom integrations",
      "White-label options",
      "SLA guarantees"
    ],
    cta: "Contact Sales",
    ctaStyle: "bg-green-600 hover:bg-green-700"
  }
]

const valueProps = [
  {
    icon: Users,
    title: "ROI Guarantee",
    description: "Save $400+/month on manual data entry costs"
  },
  {
    icon: Zap,
    title: "Time Savings",
    description: "30-minute tasks reduced to 30 seconds"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II, GDPR, CCPA compliant"
  }
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Enterprise Pricing & Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. All plans include 
            our dual AI processing engine and enterprise-grade security.
          </p>
        </motion.div>

        {/* Value Propositions */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <prop.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{prop.title}</h3>
              <p className="text-gray-600">{prop.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative p-8 rounded-2xl border-2 ${plan.bgColor} ${plan.borderColor} hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-orange-500 ring-opacity-50' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.color} rounded-xl mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                className={`w-full py-3 px-6 ${plan.ctaStyle} text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our enterprise team can create a tailored solution for your specific 
              needs with custom integrations, on-premises deployment, and dedicated support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Schedule Enterprise Demo
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Case Studies
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
