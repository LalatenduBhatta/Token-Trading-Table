'use client';

import { Github, Twitter, Discord, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-800 bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600" />
              <span className="text-xl font-bold text-white">Axiom Trade</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Advanced decentralized trading platform for discovering and trading tokens.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Discord className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Product</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Token Discovery
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Trading Terminal
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Portfolio Tracker
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  API Access
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Risk Disclosure
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">
              © {currentYear} Axiom Trade. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>Version 1.0.0</span>
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}