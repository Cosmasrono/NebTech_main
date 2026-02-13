<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

defineProps({
    canLogin: { type: Boolean },
    canRegister: { type: Boolean },
    laravelVersion: { type: String, required: true },
    phpVersion: { type: String, required: true },
});

const activeSection = ref('home');
const heroLoaded = ref(false);
const navScrolled = ref(false);
const mobileMenuOpen = ref(false);

const scrollToSection = (section) => {
    activeSection.value = section;
    mobileMenuOpen.value = false;
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
};

const services = [
    { 
        title: 'AI & Machine Learning', 
        icon: '🤖', 
        description: 'Harness the power of artificial intelligence to automate processes, predict outcomes, and gain competitive insights. Our AI solutions transform raw data into strategic business advantages.',
        features: ['Natural Language Processing', 'Predictive Analytics', 'Computer Vision', 'Deep Learning Models']
    },
    { 
        title: 'Enterprise Architecture', 
        icon: '🏗️', 
        description: 'Design scalable, resilient systems that grow with your business. We create technology roadmaps that align with your strategic objectives and ensure long-term sustainability.',
        features: ['System Design', 'Microservices Architecture', 'API Strategy', 'Technology Roadmapping']
    },
    { 
        title: 'Microsoft Dynamics 365', 
        icon: '💼', 
        description: 'Streamline operations with Business Central implementation and customization. We optimize your ERP to match your unique business processes and drive operational excellence.',
        features: ['BC Implementation', 'Custom Extensions', 'Integration Services', 'Training & Support']
    },
    { 
        title: 'Cybersecurity', 
        icon: '🔒', 
        description: 'Protect your digital assets with comprehensive security solutions. From threat assessment to compliance management, we ensure your business stays secure in an evolving threat landscape.',
        features: ['Security Audits', 'Penetration Testing', 'Compliance Management', '24/7 Monitoring']
    },
    { 
        title: 'Cloud Infrastructure', 
        icon: '☁️', 
        description: 'Leverage the power of AWS, Azure, and Google Cloud with expert migration and management. We build scalable, cost-effective cloud solutions with automated DevOps pipelines.',
        features: ['Cloud Migration', 'DevOps Automation', 'Infrastructure as Code', 'Multi-Cloud Strategy']
    },
    { 
        title: 'Custom Development', 
        icon: '💻', 
        description: 'Build bespoke web and mobile applications tailored to your exact requirements. Modern frameworks, clean code, and performance optimization are our standard.',
        features: ['Web Applications', 'Mobile Apps', 'Progressive Web Apps', 'API Development']
    },
];

const handleScroll = () => {
    navScrolled.value = window.scrollY > 50;
    
    const sections = ['contact', 'services', 'mission', 'about', 'home'];
    for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 200) {
            activeSection.value = section;
            break;
        }
    }
};

let observer = null;
const initScrollAnimations = () => {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    nextTick(() => {
        document.querySelectorAll('.anim-fade-up, .anim-slide-left, .anim-slide-right, .anim-scale-in, .anim-stagger').forEach((el) => {
            observer.observe(el);
        });
    });
};

const animateCounter = (el, target, suffix = '') => {
    const duration = 2000;
    const startTime = performance.now();
    
    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * easeOut) + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };
    
    requestAnimationFrame(update);
};

let counterObserver = null;
const initCounterAnimations = () => {
    counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    const suffix = entry.target.dataset.suffix || '';
                    animateCounter(entry.target, target, suffix);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );
    
    nextTick(() => {
        document.querySelectorAll('.counter-value').forEach((el) => {
            counterObserver.observe(el);
        });
    });
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(() => { heroLoaded.value = true; }, 100);
    initScrollAnimations();
    initCounterAnimations();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    observer?.disconnect();
    counterObserver?.disconnect();
});
</script>

<template>
    <div class="selection:bg-maroon-600/20 selection:text-maroon-900">
        <Head title="NebTech | Enterprise Technology Solutions" />

        <!-- Professional Navigation -->
        <nav 
            :class="navScrolled ? 'bg-white shadow-xl border-b border-gray-200' : 'bg-white/95 backdrop-blur-xl border-b border-gray-100'" 
            class="fixed w-full top-0 z-50 transition-all duration-300"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20">
                    <!-- Logo -->
                    <div class="flex items-center gap-3 cursor-pointer group" @click="scrollToSection('home')">
                        <img src="/img/logo.png" alt="NebTech Logo" class="h-11 w-auto">
                    </div>
                    
                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex gap-8">
                        <button 
                            v-for="section in ['home', 'about', 'services', 'contact']" 
                            :key="section" 
                            @click="scrollToSection(section)" 
                            :class="activeSection === section ? 'text-maroon-600' : 'text-gray-700 hover:text-maroon-600'" 
                            class="relative transition-colors duration-300 text-sm font-semibold uppercase tracking-wider"
                        >
                            {{ section }}
                            <span 
                                :class="activeSection === section ? 'w-full opacity-100' : 'w-0 opacity-0'" 
                                class="absolute -bottom-1 left-0 h-0.5 bg-maroon-600 transition-all duration-300"
                            ></span>
                        </button>
                    </div>
                    
                    <!-- Auth Buttons -->
                    <div class="hidden md:flex items-center gap-4">
                        <template v-if="$page.props.auth.user">
                            <Link 
                                :href="route('dashboard')" 
                                class="px-6 py-2.5 bg-maroon-600 text-white rounded-lg text-sm font-semibold hover:bg-maroon-700 transition-all duration-300 shadow-lg shadow-maroon-600/30"
                            >
                                Dashboard
                            </Link>
                        </template>
                       
                    </div>

                    <!-- Mobile Menu Button -->
                    <button 
                        @click="mobileMenuOpen = !mobileMenuOpen" 
                        class="md:hidden text-gray-900 p-2"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Mobile Menu -->
                <div 
                    v-show="mobileMenuOpen" 
                    class="md:hidden py-4 border-t border-gray-200"
                >
                    <div class="flex flex-col gap-4">
                        <button 
                            v-for="section in ['home', 'about', 'services', 'contact']" 
                            :key="section" 
                            @click="scrollToSection(section)" 
                            class="text-left px-4 py-2 text-gray-700 hover:text-maroon-600 hover:bg-gray-50 rounded-lg transition-all uppercase tracking-wider text-sm font-semibold"
                        >
                            {{ section }}
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section with Background Image -->
        <section id="home" class="relative min-h-screen flex items-center overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80" 
                    alt="Modern technology workspace"
                    class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-r from-white/60 via-white/50 to-white/40"></div>
                <div class="absolute inset-0 bg-gradient-to-br from-maroon-50/40 via-transparent to-transparent"></div>
            </div>

            <!-- Grid Pattern Overlay -->
            <div class="absolute inset-0 z-[1] opacity-[0.03]">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="hero-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" stroke-width="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                </svg>
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
                <div class="max-w-4xl">
                    <!-- Badge -->
                    <div 
                        :class="heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'" 
                        class="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900/80 backdrop-blur-md text-white border border-gray-900/50 rounded-full text-xs font-bold tracking-wider uppercase mb-8 transition-all duration-700 delay-200"
                    >
                        <span class="relative flex h-2.5 w-2.5">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-maroon-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-maroon-500"></span>
                        </span>
                        Trusted by 150+ Enterprise Clients
                    </div>

                    <!-- Main Heading -->
                    <h1 
                        :class="heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'" 
                        class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-8 transition-all duration-700 delay-400"
                    >
                        Transform Your Business with
                        <span class="block mt-3 bg-gradient-to-r from-maroon-600 via-maroon-700 to-orange-600 bg-clip-text text-transparent">
                            Enterprise Software Solutions
                        </span>
                    </h1>

                    <!-- Subheading -->
                    <p 
                        :class="heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'" 
                        class="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mb-12 transition-all duration-700 delay-600"
                    >
                        NebTech empowers businesses across East Africa with world-class ERP systems, advanced Cybersecurity protocols, and AI-driven innovations that drive measurable growth.
                    </p>

                    <!-- CTA Buttons -->
                    <div 
                        :class="heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'" 
                        class="flex flex-wrap gap-5 mb-16 transition-all duration-700 delay-800"
                    >
                        <button 
                            @click="scrollToSection('contact')" 
                            class="group px-8 py-4 bg-maroon-700 text-white rounded-xl font-bold hover:bg-maroon-800 transition-all duration-300 shadow-2xl shadow-maroon-600/40 hover:shadow-maroon-600/60 hover:-translate-y-0.5 relative overflow-hidden"
                        >
                            <span class="relative z-10 flex items-center gap-2">
                                Schedule Consultation
                                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </button>
                        <button 
                            @click="scrollToSection('services')" 
                            class="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-xl font-bold hover:bg-gray-900 hover:text-white transition-all duration-300 backdrop-blur-md"
                        >
                            Explore Services
                        </button>
                    </div>

                    <!-- Trust Indicators -->
                    <div 
                        :class="heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'" 
                        class="flex flex-wrap items-center gap-8 text-gray-700 text-sm transition-all duration-700 delay-1000"
                    >
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-gray-900/90 backdrop-blur-md rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-maroon-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <span class="font-semibold">ISO 27001 Certified</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-gray-900/90 backdrop-blur-md rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-maroon-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <span class="font-semibold">Microsoft Gold Partner</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-gray-900/90 backdrop-blur-md rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-maroon-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <span class="font-semibold">AWS Advanced Partner</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Scroll Indicator -->
            <div 
                :class="heroLoaded ? 'opacity-100' : 'opacity-0'" 
                class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-1000 delay-1200 cursor-pointer group" 
                @click="scrollToSection('about')"
            >
                <div class="flex flex-col items-center gap-2">
                    <span class="text-gray-700 text-xs font-semibold uppercase tracking-wider group-hover:text-gray-900 transition-colors">Scroll to explore</span>
                    <div class="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center p-2 group-hover:border-gray-900 transition-colors">
                        <div class="w-1.5 h-3 bg-gray-700 rounded-full animate-scroll-bounce group-hover:bg-gray-900"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="py-24 bg-white relative">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    <div class="text-center anim-fade-up">
                        <div class="counter-value text-5xl md:text-6xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3" data-target="150" data-suffix="+">0</div>
                        <div class="text-sm font-bold text-gray-600 uppercase tracking-widest">Enterprise Clients</div>
                    </div>
                    <div class="text-center anim-fade-up" style="transition-delay: 100ms">
                        <div class="counter-value text-5xl md:text-6xl font-bold bg-gradient-to-br from-maroon-600 to-maroon-700 bg-clip-text text-transparent mb-3" data-target="75" data-suffix="+">0</div>
                        <div class="text-sm font-bold text-gray-600 uppercase tracking-widest">Technical Experts</div>
                    </div>
                    <div class="text-center anim-fade-up" style="transition-delay: 200ms">
                        <div class="text-5xl md:text-6xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">99.9%</div>
                        <div class="text-sm font-bold text-gray-600 uppercase tracking-widest">System Uptime</div>
                    </div>
                    <div class="text-center anim-fade-up" style="transition-delay: 300ms">
                        <div class="counter-value text-5xl md:text-6xl font-bold bg-gradient-to-br from-maroon-600 to-maroon-700 bg-clip-text text-transparent mb-3" data-target="12" data-suffix="+">0</div>
                        <div class="text-sm font-bold text-gray-600 uppercase tracking-widest">Years Excellence</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section with Background -->
        <section id="about" class="relative py-32 overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" 
                    alt="Team collaboration"
                    class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/70"></div>
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="grid lg:grid-cols-2 gap-20 items-center">
                    <div class="anim-slide-left">
                        <h2 class="text-sm font-bold text-maroon-600 uppercase tracking-widest mb-4">About NebTech</h2>
                        <h3 class="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            Pioneering Digital Excellence Across East Africa
                        </h3>
                        <div class="space-y-6 text-lg text-gray-200 leading-relaxed">
                            <p>
                                <strong class="text-white">NebTech</strong> is East Africa's premier Enterprise Software Solutions provider, specializing in digital transformation through high-impact technology. With over 12 years of proven excellence, we partner with leading organizations to design, implement, and optimize mission-critical ERP, AI, and Cybersecurity systems.
                            </p>
                            <p>
                                Our multidisciplinary team of 75+ experts combines deep technical expertise with strategic business acumen, delivering software solutions that perfectly align technology investments with organizational objectives. From AI-powered automation to secure enterprise architectures, we build the foundations for tomorrow's success.
                            </p>
                            <p>
                                Headquartered in Nairobi, Kenya, we serve clients across financial services, manufacturing, retail, and healthcare sectors throughout East Africa. Our commitment to excellence has earned us ISO 27001 certification and partnerships with global technology leaders in ERP and security.
                            </p>
                        </div>

                        <!-- Key Differentiators -->
                        <div class="mt-12 grid grid-cols-2 gap-6">
                            <div class="bg-gradient-to-br from-maroon-50 to-orange-50 border-2 border-maroon-100 rounded-2xl p-6 hover:shadow-xl hover:border-maroon-300 transition-all duration-300">
                                <div class="text-4xl font-bold text-maroon-600 mb-2">ISO 27001</div>
                                <div class="text-sm font-semibold text-gray-700">Security Certified</div>
                            </div>
                            <div class="bg-gradient-to-br from-maroon-50 to-orange-50 border-2 border-maroon-100 rounded-2xl p-6 hover:shadow-xl hover:border-maroon-300 transition-all duration-300">
                                <div class="text-4xl font-bold text-maroon-600 mb-2">24/7</div>
                                <div class="text-sm font-semibold text-gray-700">Enterprise Support</div>
                            </div>
                        </div>
                    </div>

                    <div class="relative anim-slide-right">
                        <div class="relative bg-white rounded-3xl shadow-2xl p-8 border-4 border-gray-100">
                            <!-- Decorative Elements -->
                            <div class="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-maroon-500 to-orange-500 rounded-3xl opacity-10 blur-2xl"></div>
                            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-maroon-500 to-orange-500 rounded-3xl opacity-10 blur-2xl"></div>
                            
                            <!-- Content -->
                            <div class="relative space-y-8">
                                <div class="flex items-start gap-5">
                                    <div class="w-14 h-14 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-xl font-bold text-gray-900 mb-2">Strategic Partnership</div>
                                        <div class="text-gray-600 leading-relaxed">Long-term technology alignment that evolves with your business needs and market dynamics.</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start gap-5">
                                    <div class="w-14 h-14 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-xl font-bold text-gray-900 mb-2">Agile Delivery</div>
                                        <div class="text-gray-600 leading-relaxed">Rapid, iterative implementation methodology ensuring faster time-to-value and continuous improvement.</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start gap-5">
                                    <div class="w-14 h-14 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-xl font-bold text-gray-900 mb-2">Security First</div>
                                        <div class="text-gray-600 leading-relaxed">Enterprise-grade protection with comprehensive compliance management and 24/7 monitoring.</div>
                                    </div>
                                </div>

                                <!-- Quote Box -->
                                <div class="bg-gradient-to-br from-maroon-50 to-orange-50 border-l-4 border-maroon-600 rounded-xl p-6 mt-8">
                                    <div class="text-gray-600 text-sm font-semibold mb-2">Our Commitment</div>
                                    <div class="text-gray-900 font-bold text-xl leading-relaxed">
                                        "Excellence in every engagement, innovation in every solution."
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Mission & Vision with Background -->
        <section id="mission" class="relative py-32 overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80" 
                    alt="Technology innovation"
                    class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-br from-gray-900/97 via-gray-900/95 to-maroon-900/95"></div>
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="text-center max-w-3xl mx-auto mb-20 anim-fade-up">
                    <h2 class="text-sm font-bold text-maroon-400 uppercase tracking-widest mb-4">Mission & Vision</h2>
                    <h3 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Driving Africa's Digital Future Forward
                    </h3>
                    <p class="text-xl text-gray-300 leading-relaxed">
                        We exist to empower organizations with technology that transforms challenges into competitive advantages and aspirations into achievements.
                    </p>
                </div>

                <div class="grid lg:grid-cols-2 gap-10">
                    <!-- Mission -->
                    <div class="anim-slide-left">
                        <div class="bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-10 h-full hover:bg-white/10 hover:border-maroon-500/50 transition-all duration-500 group">
                            <div class="w-20 h-20 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                                🎯
                            </div>
                            <h4 class="text-3xl font-bold text-white mb-6">Our Mission</h4>
                            <p class="text-gray-300 text-lg leading-relaxed mb-8">
                                To deliver world-class technology solutions that enable African businesses to compete globally, through strategic consulting, innovative engineering, and unwavering commitment to client success.
                            </p>
                            <ul class="space-y-4">
                                <li class="flex items-start gap-4 text-gray-400">
                                    <svg class="w-6 h-6 text-maroon-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="text-base">Deliver measurable business value through innovative technology solutions</span>
                                </li>
                                <li class="flex items-start gap-4 text-gray-400">
                                    <svg class="w-6 h-6 text-maroon-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="text-base">Build long-term partnerships based on trust, transparency, and results</span>
                                </li>
                                <li class="flex items-start gap-4 text-gray-400">
                                    <svg class="w-6 h-6 text-maroon-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="text-base">Foster continuous innovation through learning and adaptation</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Vision -->
                    <div class="anim-slide-right">
                        <div class="bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-10 h-full hover:bg-white/10 hover:border-maroon-500/50 transition-all duration-500 group">
                            <div class="w-20 h-20 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                                🔭
                            </div>
                            <h4 class="text-3xl font-bold text-white mb-6">Our Vision</h4>
                            <p class="text-gray-300 text-lg leading-relaxed mb-8">
                                To be East Africa's most trusted technology partner, recognized for innovation excellence, and our pivotal role in shaping the region's digital economy and competitive landscape.
                            </p>
                            <ul class="space-y-4">
                                <li class="flex items-start gap-4 text-gray-400">
                                    <svg class="w-6 h-6 text-maroon-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="text-base">Lead Africa's enterprise technology transformation journey</span>
                                </li>
                                <li class="flex items-start gap-4 text-gray-400">
                                    <svg class="w-6 h-6 text-maroon-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="text-base">Set the benchmark for technical excellence and innovation</span>
                                </li>
                                <li class="flex items-start gap-4 text-gray-400">
                                    <svg class="w-6 h-6 text-maroon-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="text-base">Empower businesses to thrive in the global digital economy</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Core Values -->
                <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div 
                        v-for="(value, idx) in [
                            { icon: '💡', label: 'Innovation', desc: 'Continuous advancement' },
                            { icon: '🤝', label: 'Integrity', desc: 'Ethical excellence' },
                            { icon: '🎯', label: 'Excellence', desc: 'Quality delivery' },
                            { icon: '🌍', label: 'Impact', desc: 'Measurable results' }
                        ]" 
                        :key="value.label" 
                        class="anim-stagger text-center p-8 bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-2xl hover:bg-white/10 hover:border-maroon-500/50 hover:-translate-y-2 transition-all duration-300 group" 
                        :style="{ transitionDelay: `${idx * 100}ms` }"
                    >
                        <div class="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{{ value.icon }}</div>
                        <div class="text-white font-bold text-lg mb-2">{{ value.label }}</div>
                        <div class="text-gray-400 text-sm">{{ value.desc }}</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section with Background -->
        <section id="services" class="relative py-32 overflow-hidden bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="text-center max-w-3xl mx-auto mb-20 anim-fade-up">
                    <h2 class="text-sm font-bold text-maroon-600 uppercase tracking-widest mb-4">Our Services</h2>
                    <h3 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Comprehensive Technology Solutions
                    </h3>
                    <p class="text-xl text-gray-700 leading-relaxed">
                        End-to-end capabilities spanning strategy, implementation, and managed services to accelerate your digital transformation journey.
                    </p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div 
                        v-for="(service, index) in services" 
                        :key="service.title" 
                        class="anim-stagger bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-3xl p-8 hover:border-maroon-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group" 
                        :style="{ transitionDelay: `${index * 100}ms` }"
                    >
                        <div class="w-16 h-16 bg-gradient-to-br from-maroon-100 to-orange-100 border-2 border-maroon-300 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-gradient-to-br group-hover:from-maroon-600 group-hover:to-maroon-700 group-hover:scale-110 transition-all duration-300 shadow-lg">
                            {{ service.icon }}
                        </div>
                        <h4 class="text-2xl font-bold mb-4 text-gray-900 group-hover:text-maroon-600 transition-colors duration-300">
                            {{ service.title }}
                        </h4>
                        <p class="text-gray-600 leading-relaxed mb-6">
                            {{ service.description }}
                        </p>
                        <ul class="space-y-3">
                            <li 
                                v-for="feature in service.features" 
                                :key="feature" 
                                class="flex items-center gap-3 text-sm text-gray-700"
                            >
                                <svg class="w-5 h-5 text-maroon-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                                <span class="font-medium">{{ feature }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section with Background -->
        <section id="contact" class="relative py-32 overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&q=80" 
                    alt="Professional office"
                    class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-r from-maroon-900/95 via-maroon-800/95 to-gray-900/95"></div>
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 border-2 border-white/20 anim-scale-in shadow-2xl">
                    <div class="grid lg:grid-cols-2 gap-16">
                        <div class="anim-slide-left">
                            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Let's Transform Your Business Together
                            </h2>
                            <p class="text-xl text-gray-200 mb-12 leading-relaxed">
                                Schedule a consultation with our experts to discuss your technology needs and discover how we can accelerate your digital transformation with proven, enterprise-grade solutions.
                            </p>
                            
                            <div class="space-y-6">
                                <a href="mailto:ccosmas001@gmail.com" class="flex items-center gap-5 group">
                                    <div class="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:bg-maroon-600 transition-all duration-300 shadow-lg">
                                        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-sm text-gray-400 font-semibold">Email Us</div>
                                        <div class="text-xl font-bold text-white group-hover:text-maroon-300 transition-colors">ccosmas001@gmail.com</div>
                                    </div>
                                </a>

                                <a href="tel:+254725830546" class="flex items-center gap-5 group">
                                    <div class="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:bg-maroon-600 transition-all duration-300 shadow-lg">
                                        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-sm text-gray-400 font-semibold">Call Us</div>
                                        <div class="text-xl font-bold text-white group-hover:text-maroon-300 transition-colors">+254 725 830 546</div>
                                    </div>
                                </a>

                                <div class="flex items-center gap-5">
                                    <div class="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
                                        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-sm text-gray-400 font-semibold">Visit Us</div>
                                        <div class="text-xl font-bold text-white">Nairobi, Kenya</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="anim-slide-right">
                            <form @submit.prevent class="space-y-6">
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-sm font-bold text-gray-200 mb-2">Full Name *</label>
                                        <input 
                                            type="text" 
                                            required
                                            placeholder="John Doe" 
                                            class="w-full px-5 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-maroon-400 focus:bg-white/20 transition-all duration-300"
                                        >
                                    </div>
                                    <div>
                                        <label class="block text-sm font-bold text-gray-200 mb-2">Email Address *</label>
                                        <input 
                                            type="email" 
                                            required
                                            placeholder="john@company.com" 
                                            class="w-full px-5 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-maroon-400 focus:bg-white/20 transition-all duration-300"
                                        >
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-bold text-gray-200 mb-2">Organization *</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="Your Company Name" 
                                        class="w-full px-5 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-maroon-400 focus:bg-white/20 transition-all duration-300"
                                    >
                                </div>

                                <div>
                                    <label class="block text-sm font-bold text-gray-200 mb-2">Service Interest</label>
                                    <select class="w-full px-5 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-maroon-400 focus:bg-white/20 transition-all duration-300">
                                        <option value="" class="bg-gray-900">Select a service</option>
                                        <option value="ai" class="bg-gray-900">AI & Machine Learning</option>
                                        <option value="architecture" class="bg-gray-900">Enterprise Architecture</option>
                                        <option value="dynamics" class="bg-gray-900">Microsoft Dynamics 365</option>
                                        <option value="security" class="bg-gray-900">Cybersecurity</option>
                                        <option value="cloud" class="bg-gray-900">Cloud Infrastructure</option>
                                        <option value="development" class="bg-gray-900">Custom Development</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-bold text-gray-200 mb-2">Tell us about your project *</label>
                                    <textarea 
                                        rows="4" 
                                        required
                                        placeholder="Describe your requirements, challenges, and objectives..." 
                                        class="w-full px-5 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-maroon-400 focus:bg-white/20 transition-all duration-300 resize-none"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    class="w-full py-5 bg-white text-maroon-700 rounded-xl font-bold text-lg hover:bg-maroon-50 transition-all duration-300 shadow-2xl hover:shadow-white/30 hover:-translate-y-1 flex items-center justify-center gap-3"
                                >
                                    <span>Schedule Free Consultation</span>
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>

                                <p class="text-sm text-gray-300 text-center">
                                    ⚡ We respond within 24 business hours
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Professional Footer -->
        <footer class="bg-gray-900 border-t border-gray-800 py-16 px-4 sm:px-6 lg:px-8">
            <div class="max-w-7xl mx-auto">
                <div class="grid md:grid-cols-4 gap-12 mb-12">
                    <!-- Brand -->
                    <div class="md:col-span-2">
                        <div class="flex items-center gap-3 mb-6">
                            <img src="/img/logo.png" alt="NebTech Logo" class="h-11 w-auto">
                        </div>
                        <p class="text-gray-400 mb-6 max-w-md leading-relaxed">
                            Enterprise technology solutions for digital transformation. Empowering African businesses to compete globally through innovation and excellence.
                        </p>
                        <div class="flex gap-4">
                            <a href="#" class="w-11 h-11 bg-gray-800 hover:bg-maroon-600 border border-gray-700 hover:border-maroon-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                            </a>
                            <a href="#" class="w-11 h-11 bg-gray-800 hover:bg-maroon-600 border border-gray-700 hover:border-maroon-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>
                            <a href="#" class="w-11 h-11 bg-gray-800 hover:bg-maroon-600 border border-gray-700 hover:border-maroon-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            </a>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h4 class="font-bold text-white mb-6 text-lg">Quick Links</h4>
                        <ul class="space-y-3">
                            <li><button @click="scrollToSection('about')" class="text-gray-400 hover:text-maroon-400 transition-colors text-sm">About Us</button></li>
                            <li><button @click="scrollToSection('services')" class="text-gray-400 hover:text-maroon-400 transition-colors text-sm">Services</button></li>
                            <li><button @click="scrollToSection('mission')" class="text-gray-400 hover:text-maroon-400 transition-colors text-sm">Mission & Vision</button></li>
                            <li><button @click="scrollToSection('contact')" class="text-gray-400 hover:text-maroon-400 transition-colors text-sm">Contact</button></li>
                        </ul>
                    </div>

                    <!-- Services -->
                    <div>
                        <h4 class="font-bold text-white mb-6 text-lg">Services</h4>
                        <ul class="space-y-3">
                            <li><a href="#" class="text-gray-400 hover:text-maroon-400 transition-colors text-sm">AI & Machine Learning</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-maroon-400 transition-colors text-sm">Cloud Solutions</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-maroon-400 transition-colors text-sm">Cybersecurity</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-maroon-400 transition-colors text-sm">Dynamics 365 BC</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Bottom Bar -->
                <div class="pt-8 border-t border-gray-800">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p class="text-gray-500 text-sm flex items-center gap-1">
                            © 2026 NebTech Business Solutions. Prepared with <span class="text-maroon-500">♥</span> by <span class="text-gray-300 font-semibold cursor-pointer hover:text-maroon-400 transition-colors">@cossi001</span>
                        </p>
                        <div class="flex gap-6 text-sm text-gray-500">
                            <a href="#" class="hover:text-maroon-400 transition-colors">Privacy Policy</a>
                            <a href="#" class="hover:text-maroon-400 transition-colors">Terms of Service</a>
                            <a href="#" class="hover:text-maroon-400 transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
/* Animation Classes */
.anim-fade-up {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.anim-fade-up.animate-visible { 
    opacity: 1; 
    transform: translateY(0); 
}

.anim-slide-left {
    opacity: 0;
    transform: translateX(-60px);
    transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.anim-slide-left.animate-visible { 
    opacity: 1; 
    transform: translateX(0); 
}

.anim-slide-right {
    opacity: 0;
    transform: translateX(60px);
    transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.anim-slide-right.animate-visible { 
    opacity: 1; 
    transform: translateX(0); 
}

.anim-scale-in {
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.anim-scale-in.animate-visible { 
    opacity: 1; 
    transform: scale(1); 
}

.anim-stagger {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.anim-stagger.animate-visible { 
    opacity: 1; 
    transform: translateY(0); 
}

/* Scroll Animation */
@keyframes scroll-bounce {
    0%, 100% { 
        transform: translateY(0); 
        opacity: 1; 
    }
    50% { 
        transform: translateY(10px); 
        opacity: 0.5; 
    }
}
.animate-scroll-bounce {
    animation: scroll-bounce 2s ease-in-out infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 12px;
}
::-webkit-scrollbar-track {
    background: #1f2937;
}
::-webkit-scrollbar-thumb {
    background: #7f1d1d;
    border-radius: 6px;
}
::-webkit-scrollbar-thumb:hover {
    background: #991b1b;
}

/* Smooth scroll */
html {
    scroll-behavior: smooth;
}
</style>