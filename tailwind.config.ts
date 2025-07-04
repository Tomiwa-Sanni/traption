import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
			},
			letterSpacing: {
				'glass': '-0.05em',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Liquid Glass Colors
				glass: {
					bg: 'var(--glass-bg)',
					'bg-hover': 'var(--glass-bg-hover)',
					border: 'var(--glass-border)',
					'text-primary': 'var(--text-primary)',
					'text-secondary': 'var(--text-secondary)',
					'text-muted': 'var(--text-muted)',
				},
				// Existing colors
				traption: {
					purple: '#6B46C1',
					lavender: '#E9D8FD',
					light: '#F3EBFF',
				},
				platform: {
					instagram: '#E1306C',
					tiktok: '#000000',
					twitter: '#1DA1F2',
					linkedin: '#0077B5',
					facebook: '#4267B2',
					pinterest: '#E60023',
					youtube: '#FF0000',
					whatsapp: '#25D366',
				},
				tone: {
					professional: '#0077B5',
					casual: '#4CAF50',
					witty: '#FF9800',
					inspirational: '#9C27B0',
					promotional: '#F44336',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
			},
			backdropBlur: {
				'glass': '16px',
				'glass-lg': '20px',
			},
			boxShadow: {
				'glass': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(255, 255, 255, 0.1)',
				'glass-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(59, 130, 246, 0.15)',
				'glass-focus': '0 0 0 2px rgba(59, 130, 246, 0.5), 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(59, 130, 246, 0.3)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'fadeIn': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'shimmer': {
					'0%': {
						'background-position': '-200% 0'
					},
					'100%': {
						'background-position': '200% 0'
					}
				},
				'ripple': {
					'0%': {
						width: '0',
						height: '0',
						opacity: '1'
					},
					'100%': {
						width: '300px',
						height: '300px',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'fadeIn': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'shimmer': 'shimmer 2s infinite',
				'ripple': 'ripple 0.6s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
