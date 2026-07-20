import { motion } from "framer-motion";
import { Zap, Shield, Cpu, Heart, Truck, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Zap,
    title: "Speed",
    desc: "Fast and efficient deliveries across India with optimized routes.",
  },
  {
    icon: Shield,
    title: "Trust",
    desc: "Your parcels are handled with care and delivered securely.",
  },
  {
    icon: Cpu,
    title: "Technology",
    desc: "Smart vehicle management, AI-powered logistics, and real-time tracking.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    desc: "Dedicated support to ensure a smooth experience for every user.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const About = () => (
  <div className="min-h-screen pt-24 pb-20">
    <div className="container mx-auto px-4 md:px-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">
          About Rydex Swift
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Rydex Swift is an Indian vehicle management and courier delivery
          platform, dedicated to making transportation and parcel delivery
          faster, smarter, and more reliable across India.
        </p>
      </motion.div>

      {/* Story */}
      <motion.section {...fadeUp} className="max-w-3xl mx-auto mb-20">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">
          Our Story
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Rydex Swift was created with a vision to transform the way India
          manages transportation and courier services. Starting as a vehicle
          management platform, we expanded into courier delivery to provide a
          complete mobility and logistics solution for individuals and businesses.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Today, Rydex Swift is building a growing network across Indian cities,
          combining advanced technology, real-time tracking, and dedicated service
          to ensure every ride and every parcel reaches its destination safely and
          on time.
        </p>
      </motion.section>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <motion.div {...fadeUp}>
          <Card className="h-full border-border/50 shadow-sm">
            <CardContent className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-muted-foreground">
                To provide fast, affordable, and reliable vehicle management and
                courier delivery services that connect people and businesses across
                India.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
          <Card className="h-full border-border/50 shadow-sm">
            <CardContent className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 mb-4">
                <Globe className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                Our Vision
              </h3>
              <p className="text-muted-foreground">
                To become India's leading integrated mobility and logistics
                platform, delivering rides and parcels with speed, transparency,
                and innovation.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Values */}
      <motion.div {...fadeUp} className="text-center mb-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Our Values
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="h-full border-border/50 shadow-sm text-center">
              <CardContent className="p-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {v.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default About;