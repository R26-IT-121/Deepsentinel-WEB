/**
 * Motion primitives: GSAP with ScrollTrigger, and Lenis smooth scrolling.
 *
 * This module was previously absent from the repository — `lib/` in the
 * fusion_engine gitignore was a Python packaging rule that also matched this
 * directory, so the file was never committed and the web app could not build
 * from a clean clone. The ignore rule is now scoped to the backend.
 *
 * Everything here honours prefers-reduced-motion. Scroll hijacking and pinned
 * scrub animations are exactly what that setting asks us not to do, and this
 * is a tool people may use for hours at a time.
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Registering twice is harmless, but React strict mode double-invokes effects,
// so guard anyway rather than rely on that.
if (!gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * True when the viewer has asked for reduced motion.
 *
 * Read at call time rather than cached: the setting can change while the page
 * is open, and a stale answer would keep animating at someone who just turned
 * it off.
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

let lenis = null
let frameHandle = null

/**
 * Start smooth scrolling and drive ScrollTrigger from it.
 *
 * Lenis replaces native scrolling with an interpolated position. ScrollTrigger
 * reads native scroll by default, so without wiring the two together pinned
 * sections drift out of step with the content. Returns a no-op when reduced
 * motion is requested, leaving native scrolling untouched.
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return null
  if (lenis) return lenis
  if (prefersReducedMotion()) return null

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Touch devices already scroll smoothly and interpolating on top of that
    // feels laggy rather than fluid.
    smoothTouch: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const raf = (time) => {
    // Lenis expects milliseconds; requestAnimationFrame already supplies them.
    lenis?.raf(time)
    frameHandle = requestAnimationFrame(raf)
  }
  frameHandle = requestAnimationFrame(raf)

  // ScrollTrigger runs its own ticker; letting GSAP handle lag smoothing twice
  // produces visible stutter on slower machines.
  gsap.ticker.lagSmoothing(0)

  return lenis
}

/**
 * Tear down smooth scrolling.
 *
 * Used as an effect cleanup, so it must be safe to call when init returned
 * null (reduced motion) or was never called at all.
 */
export function destroySmoothScroll() {
  if (frameHandle !== null) {
    cancelAnimationFrame(frameHandle)
    frameHandle = null
  }
  if (lenis) {
    lenis.off('scroll', ScrollTrigger.update)
    lenis.destroy()
    lenis = null
  }
  gsap.ticker.lagSmoothing(500, 33) // GSAP's default
}

export { gsap, ScrollTrigger }
