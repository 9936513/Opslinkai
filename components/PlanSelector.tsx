'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Star, Shield, ArrowRight } from 'lucide-react'
import { PROCESSING_TIERS } from '../lib/tiered-processing'

interface PlanSelectorProps {
  onSelectPlan: (plan: 'starter' | 'professional' | 'business') => void
  currentPlan?: string
}

export function PlanSelector({ onSelectPlan, currentPlan }: PlanSelectorProps) {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'professional' | 'business'>('professional')

  const plans = [
    {
      key: 'starter' as const,
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for individual agents',
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      popular: false
    },
    {
      key: 'professional' as const,
      name: 'Professional',
      price: '$149',
      period: '/month',
      description: 'For power users and teams',
      icon: Star,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      popular: true
    },
    {
      key: 'business' as const,
      name: 'Business',
      price: '$399',
      period: '/month',
      description: 'For enterprises',
      icon: Shield,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      popular: false
    }
  ]

  const handleSelectPlan = (plan: 'starter' | 'professional' | 'business') => {
    setSelectedPlan(plan)
    onSelectPlan(plan)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-xl text-gray-600">
          Select the perfect plan for your document processing needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const tierData = PROCESSING_TIERS[plan.key]
          const isSelected = selectedPlan === plan.key
          const isCurrent = currentPlan === plan.key

          return (
            <motion.div
              key={plan.key}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? `${plan.borderColor} ${plan.bgColor} ring-2 ring-opacity-50`
                  : 'border-gray-200 bg-white hover:border-gray-300'
              } ${plan.popular ? 'ring-2 ring-orange-500 ring-opacity-50' : ''}`}
              onClick={() => handleSelectPlan(plan.key)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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

              {/* Current Plan Badge */}
              {isCurrent && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Current Plan
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
                {tierData.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Select Button */}
              <motion.button
                className={`w-full py-3 px-6 font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isCurrent ? 'Current Plan' : isSelected ? 'Selected' : 'Select Plan'}
                {!isCurrent && (
                  <ArrowRight className="w-4 h-4 ml-2" />
                )}
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      {/* Selected Plan Summary */}
      {selectedPlan && (
        <motion.div
          className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Selected Plan: {PROCESSING_TIERS[selectedPlan].name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">AI Model:</span>
              <span className="ml-2 text-gray-900">
                {PROCESSING_TIERS[selectedPlan].aiModel === 'gpt4v' && 'GPT-4V Only'}
                {PROCESSING_TIERS[selectedPlan].aiModel === 'smart_routing' && 'Smart Routing (Claude + GPT-4V)'}
                {PROCESSING_TIERS[selectedPlan].aiModel === 'ensemble' && 'Ensemble Validation (Both AIs)'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Monthly Limit:</span>
              <span className="ml-2 text-gray-900">
                {PROCESSING_TIERS[selectedPlan].monthlyLimit.toLocaleString()} documents
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Accuracy Guarantee:</span>
              <span className="ml-2 text-gray-900">
                {PROCESSING_TIERS[selectedPlan].accuracyGuarantee}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
