{
  description = "Development environment for the tui Hugo theme";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f system);
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
          default = pkgs.mkShell {
            name = "tui-theme-dev";
            buildInputs = with pkgs; [
              hugo
              dart-sass
            ];

            shellHook = ''
              echo "tui theme dev shell ready."
              echo "  hugo server -s exampleSite --themesDir ../.. --navigateToChanged --noHTTPCache"
            '';
          };
        }
      );
    };
}
