terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"

}

data "aws_eip" "my_instance_eip" {
  public_ip = "52.88.175.223"
}


provider "aws" {
  region  = "us-west-2"
}


resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.app_server.id
  allocation_id = data.aws_eip.my_instance_eip.id
}

data "aws_security_group" "web" {
  id ="sg-07f86986595acfaee"
}

data "aws_security_group" "ssh" {
  id ="sg-093f93e0c3ae95d15"
}

resource "aws_instance" "app_server" {
  ami           = "ami-0efcece6bed30fd98"
  instance_type = "t2.micro"
  key_name = "ec2"
  security_groups = [aws_security_group.ssh.id, aws_security_group.web.id]
  user_data = file("userdata.tpl")

  tags = {
    Name = "neflix backend terraform ansible"
  }
}